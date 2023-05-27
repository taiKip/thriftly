package com.example.api.token;

import com.example.api.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService{
    private final TokenRepository tokenRepository;
    @Override
    public void saveToken(User user, String jwtToken, TokenType bearer, boolean revoked, boolean expired) {

        Token token = Token
                .builder()
                .user(user)
                .token(jwtToken)
                .tokenType(bearer)
                .revoked(revoked)
                .expired(expired)
                .build();
        tokenRepository.save(token);
    }
    @Override
    public void revokeAllUserTokens(User user){
        List<Token> validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if(validUserTokens.isEmpty()){
            return;
        }
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public Boolean isTokenValid(String jwt) {

        return tokenRepository.findByToken(jwt)
                .map(token -> !token.isExpired() && !token.isRevoked())
                .orElse(false);
    }

    @Override
    public void inValidateToken(String jwt) {
        Optional<Token> tokenDb = tokenRepository.findByToken(jwt);
        if(tokenDb.isEmpty()){
            return;
        }
        Token foundToken = tokenDb.get();
        foundToken.setExpired(true);
        foundToken.setRevoked(true);
        tokenRepository.save(foundToken);
    }


}
