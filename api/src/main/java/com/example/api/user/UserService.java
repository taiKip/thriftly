package com.example.api.user;

import com.example.api.address.AddressService;
import com.example.api.dto.TitlePageDto;
import com.example.api.utils.PageResponseDtoMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final AddressService addressService;
private final PageResponseDtoMapper pageResponseDtoMapper;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmailIgnoreCase(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        return user.get();
    }


    public Map fetchUsers(int pageNumber, int pageSize, String sortDir, String sortBy) {
        Pageable pageable=  PageRequest.of(pageNumber,pageSize, Sort.by(sortBy).ascending());


        Page<User> users=  userRepository.findAll(pageable);


        if(users.hasContent()){
            TitlePageDto<User> titlePageDto =new TitlePageDto<>("users",users);
            return pageResponseDtoMapper.apply(titlePageDto);
        }
        else {
            return  new HashMap<>();
        }
    }

    public String assignRole(Long userId, String role) throws UserRoleNotFoundException {

        String newRole = role.toUpperCase();
       if(Role.valueOf(newRole)!=Role.USER && Role.valueOf(newRole)!=Role.ADMIN && Role.valueOf(newRole)!=Role.MANAGER){
           throw new UserRoleNotFoundException("role not found");
       }
        Optional<User> userDb = userRepository.findById(userId);
        if(userDb.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        User foundUser= userDb.get();
        foundUser.setRole(Role.valueOf(newRole));
        userRepository.save(foundUser);
        return  String.format("%s has been assigned %s role",foundUser.getName(),role);
    }

    public String banUser(Long userId) {
        Optional<User> userDb = userRepository.findById(userId);
        if(userDb.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        User foundUser= userDb.get();
        foundUser.setBanned(true);
        userRepository.save(foundUser);
        return String.format("%s has been banned from the site",foundUser.getName());
    }

    public Map searchUsersByName(String query, int pageNumber, int pageSize) {
        Pageable pageable=  PageRequest.of(pageSize,pageNumber);


        Page<User> users=  userRepository.findUsersByNameContainingIgnoreCase(query,pageable);

        if(users.hasContent()){
            TitlePageDto<User> titlePageDto =new TitlePageDto<>("products",users);
            return pageResponseDtoMapper.apply(titlePageDto);
        }
        else {
            return  new HashMap<>();
        }
    }
}
