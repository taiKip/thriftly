package com.example.api.auth;

import com.example.api.security.JwtService;
import com.example.api.user.Role;
import com.example.api.user.User;
import com.example.api.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    /***
     * @desc Register new user
     *  get user details from request ,create a user object and save.
     *  return token generated from user saved
     * @param request
     * @return token
     */
    @Override
    public AuthenticationResponseDto register(RegisterRequestDto request) {
        User user = User.builder()
                .email(request.email())
                .firstname(request.firstname())
                .lastname(request.lastname())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return AuthenticationResponseDto.builder().token(token).build();
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        User user = userRepository
                .findByEmail(
                        request.email())
                .orElseThrow(
                        () -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(user);
        return AuthenticationResponseDto.builder().token(token).build();
    }


}
