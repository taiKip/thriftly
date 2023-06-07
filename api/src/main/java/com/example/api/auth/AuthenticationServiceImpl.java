package com.example.api.auth;

import com.example.api.security.JwtService;
import com.example.api.token.TokenService;
import com.example.api.token.TokenType;
import com.example.api.user.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

import static org.springframework.beans.MethodInvocationException.ERROR_CODE;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenService tokenService;

    /***
     * @desc Register new user
     *  get user details from request ,create a user object and save.
     *  return token generated from user saved
     * @param request
     * @return token
     */
    @Override
    public AuthenticationResponseDto register(RegisterRequestDto request,CredentialsType credentialsType) throws UserNameExistsException {
        Optional<User> userDb = userRepository.findByEmailIgnoreCase(request.email());
        if (userDb.isPresent() && credentialsType==CredentialsType.EMAILPASS) {
            throw new UserNameExistsException("Email already taken");
        }else  if(userDb.isPresent() && credentialsType==CredentialsType.GOOGLE){
            authenticate(new AuthenticationRequestDto(request.email(),userDb.get().getPassword()));
        }
        User user;
        if(credentialsType==CredentialsType.EMAILPASS){
            user = User.builder()
                    .email(request.email())
                    .name(request.name())
                    .password(passwordEncoder.encode(request.password()))
                    .role(Role.USER)
                    .isBanned(false)
                    .build();
        }
        else {
            String password =generatePassayPassword();
            user = User.builder()
                    .email(request.email())
                    .name(request.name())
                    .password(passwordEncoder.encode(password))
                    .role(Role.USER)
                    .isBanned(false)
                    .build();
        }

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        tokenService.saveToken(savedUser, jwtToken, TokenType.BEARER, false, false);
        return AuthenticationResponseDto.builder().accessToken(jwtToken).refreshToken(refreshToken).build();
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        User user = userRepository
                .findByEmailIgnoreCase(
                        request.email())
                .orElseThrow(
                        () -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        tokenService.revokeAllUserTokens(user);
        tokenService.saveToken(user, token, TokenType.BEARER, false, false);
        return AuthenticationResponseDto.builder().accessToken(token).refreshToken(refreshToken).build();
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUserEmail(refreshToken);

        if (userEmail != null) {

            User user = userRepository.findByEmailIgnoreCase(userEmail).orElseThrow();

            if (jwtService.isTokenValid(refreshToken, user)) {
                String authenticationToken = jwtService.generateToken((User) user);
                tokenService.revokeAllUserTokens((User) user);
                tokenService.saveToken(user,authenticationToken);
                AuthenticationResponseDto authResponse = AuthenticationResponseDto.builder()
                        .accessToken(authenticationToken)
                        .refreshToken(refreshToken)
                        .build();
                /***
                 * @desc return json obj in a void method
                 */

                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);

            }


        }


    }
    public String generatePassayPassword() {
        PasswordGenerator gen = new PasswordGenerator();
        CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
        CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
        lowerCaseRule.setNumberOfCharacters(2);

        CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
        CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
        upperCaseRule.setNumberOfCharacters(2);

        CharacterData digitChars = EnglishCharacterData.Digit;
        CharacterRule digitRule = new CharacterRule(digitChars);
        digitRule.setNumberOfCharacters(2);

        CharacterData specialChars = new CharacterData() {
            public String getErrorCode() {
                return ERROR_CODE;
            }

            public String getCharacters() {
                return "!@#$%^&*()_+";
            }
        };
        CharacterRule splCharRule = new CharacterRule(specialChars);
        splCharRule.setNumberOfCharacters(2);

        return gen.generatePassword(10, splCharRule, lowerCaseRule,
                upperCaseRule, digitRule);
    }
}