package com.example.api.auth;

import com.example.api.user.UserNameExistsException;
import com.example.api.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

private final Oauth2Service oauth2Service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDto> register(@RequestBody @Valid RegisterRequestDto request) throws UserNameExistsException {
        return ResponseEntity.ok(authenticationService.register(request,CredentialsType.EMAILPASS));
    }

    @PostMapping("/oauth2")
    public ResponseEntity<Object> oAuth2(@RequestBody OAuth2Dto oAuth2Dto) throws IOException, InterruptedException, UserNameExistsException {

        JSONObject userData = oauth2Service.fetchUserData(oAuth2Dto.access_token());
     if(userData ==null){
         return new ResponseEntity<>("Invalid access token", HttpStatus.UNAUTHORIZED);
     }

        return ResponseEntity.ok(authenticationService.register(
                new RegisterRequestDto(userData.getString("given_name"),userData.getString("email"),""), CredentialsType.GOOGLE));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDto> authenticate(@RequestBody @Valid AuthenticationRequestDto request) {
        return ResponseEntity.ok(authenticationService.authenticate(request,CredentialsType.EMAILPASS));
    }

    @GetMapping("/refresh")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }

}
