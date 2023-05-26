package com.example.api.user;

import com.example.api.utils.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    private final UserService userService;


    @GetMapping
    public ResponseEntity<Map> fetchUsers(@RequestParam(value = "sortBy", defaultValue
            = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
                                          @RequestParam(value = "pageNo", defaultValue
                                                  = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
                                          @RequestParam(value = "pageSize", defaultValue
                                                  = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                          @RequestParam(value = "sortDir", defaultValue
                                                  = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
        return ResponseEntity.ok(userService.fetchUsers(pageNo, pageSize, sortDir, sortBy));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<String> assignRole(@PathVariable("userId") Long userId, @RequestBody String role) throws UserRoleNotFoundException {
        return ResponseEntity.ok(userService.assignRole(userId, role));
    }

    @PutMapping("/{userId}/banUser")
    public ResponseEntity<String> banUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(userService.banUser(userId));
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchUsersByName(
            @RequestParam(value = "name") String query,
            @RequestParam(value = "pageNo", defaultValue
                    = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue
                    = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize) {
        return ResponseEntity.ok(userService.searchUsersByName(query, pageNo, pageSize));

    }
}