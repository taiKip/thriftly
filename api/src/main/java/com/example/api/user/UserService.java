package com.example.api.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface UserService extends UserDetailsService {
    Map<String,Object> fetchUsers(int pageNumber, int pageSize, String sortDir, String sortBy);

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    Map<String,Object> searchUsersByName(String query, int pageNumber, int pageSize);
    String banUser(Long userId);
    String assignRole(Long userId, String role) throws UserRoleNotFoundException;

}
