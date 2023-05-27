package com.example.api.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query(value = " SELECT * FROM TOKEN t  WHERE t.user_id = ?1 AND (t.expired =false or t.revoked =false) ", nativeQuery = true)
    List<Token> findAllValidTokensByUser(Long userId);
    Optional<Token> findByToken(String token);
}
