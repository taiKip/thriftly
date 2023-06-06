package com.example.api.auth;

import com.example.api.user.UserNameExistsException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDto> register(@RequestBody @Valid RegisterRequestDto request) throws UserNameExistsException {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/oauth2")
    public ResponseEntity<AuthenticationResponseDto> oAuth2(@RequestBody OAuth2Dto oAuth2Dto) {

        return ResponseEntity.ok(new AuthenticationResponseDto(oAuth2Dto.code(),oAuth2Dto.scope()));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDto> authenticate(@RequestBody @Valid AuthenticationRequestDto request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/refresh")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }
}
