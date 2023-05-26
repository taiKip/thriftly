package com.example.api.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Map;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmailIgnoreCase(String email);
    @Query(value = "SELECT u FROM _user u WHERE u.name LIKE('%?1%') )", nativeQuery = true)
    Page<User> findUsersByNameContainingIgnoreCase(String query, Pageable pageable);
}
