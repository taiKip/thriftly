package com.example.api.user;

import com.example.api.address.AddressService;
import com.example.api.dto.TitlePageDto;
import com.example.api.utils.PageResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {
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

@Override
    public Map<String,Object> fetchUsers(int pageNumber, int pageSize, String sortDir, String sortBy) {
        Pageable pageable=  PageRequest.of(pageNumber,pageSize, Sort.by(sortBy).ascending());


        Page<User> users=  userRepository.findAll(pageable);


        if(users.hasContent()){
            TitlePageDto<User> titlePageDto =new TitlePageDto<>("items",users);
            return pageResponseDtoMapper.apply(titlePageDto);
        }
        else {
            return  new HashMap<String,Object>();
        }
    }

    @Override
    public UpdateResponseDto updateUserRoleAndStatus(Long userId, UserUpdateRequestDto requestDto) throws UserRoleNotFoundException {
        Optional<User> userDb = userRepository.findById(userId);
        if(userDb.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        User foundUser= userDb.get();
        if(Objects.nonNull(requestDto.getRole()) &&  !"".equalsIgnoreCase(requestDto.getRole())){
            String newRole = requestDto.getRole().toUpperCase();
            if(Role.valueOf(newRole)!=Role.USER && Role.valueOf(newRole)!=Role.ADMIN && Role.valueOf(newRole)!=Role.MANAGER){
                throw new UserRoleNotFoundException("role not found");
            }
            foundUser.setRole(Role.valueOf(newRole));
        }
     if(requestDto.isBanned()){
         foundUser.setBanned(true);
         foundUser.setRole(Role.BANNED);
         userRepository.save(foundUser);
         return new UpdateResponseDto(String.format("%s has been banned from the site",foundUser.getName()));
     }else if(!requestDto.isBanned()) {
         foundUser.setBanned(false);
         foundUser.setRole(Role.USER);
         userRepository.save(foundUser);
         return new UpdateResponseDto(String.format("%s has been unbanned from the site",foundUser.getName()));
     }
     userRepository.save(foundUser);
        return  new UpdateResponseDto(String.format("%s role has been assigned %s role",foundUser.getName(),requestDto.getRole().toUpperCase()));
    }


@Override
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
