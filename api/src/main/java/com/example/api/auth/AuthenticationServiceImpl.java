package com.example.api.auth;

import com.example.api.security.JwtService;
import com.example.api.token.Token;
import com.example.api.token.TokenService;
import com.example.api.token.TokenType;
import com.example.api.user.Role;
import com.example.api.user.User;
import com.example.api.user.UserNameExists;
import com.example.api.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.validation.Validator;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
private final TokenService tokenService;
    /***
     * @desc Register new user
     *  get user details from request ,create a user object and save.
     *  return token generated from user saved
     * @param request
     * @return token
     */
    @Override
    public AuthenticationResponseDto register(RegisterRequestDto request) throws UserNameExists {
        Optional<User> userDb = userRepository.findByEmailIgnoreCase(request.email());
if(userDb.isPresent()){
    throw new UserNameExists("Email already taken");
}
        User user = User.builder()
                .email(request.email())
                .name(request.name())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .isBanned(false)
                .build();
       User savedUser =  userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);

tokenService.saveToken(savedUser,jwtToken,TokenType.BEARER,false,false);
        return AuthenticationResponseDto.builder().token(jwtToken).build();
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
        tokenService.revokeAllUserTokens(user);
        tokenService.saveToken(user,token,TokenType.BEARER,false,false);
        return AuthenticationResponseDto.builder().token(token).build();
    }


}
