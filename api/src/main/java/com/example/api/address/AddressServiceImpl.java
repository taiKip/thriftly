package com.example.api.address;

import com.example.api.error.DataNotSaved;
import com.example.api.user.User;
import com.example.api.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    /***
     * @desc Save new address passed and associate it to the current signed-in user f
     * @param addressDto
     * @return
     * @throws DataNotSaved
     */
    @Override
    public Address addNewAddress(AddressDto addressDto) throws DataNotSaved {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailIgnoreCase(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        /***
         * @desc find all addresses associated to user and change to not default  if the new address is set as default
         */
        List<Address> addresses = addressRepository.findAddressesByUserId(user.getId());
        if (addressDto.isDefault()) {
            addresses.forEach(address -> {
                address.setDefault(false);
            });
        }
        Set<User> usersList = new HashSet<>();
        usersList.add(user);
        Address address = Address
                .builder()
                .name(addressDto.name())
                .city(addressDto.city())
                .phone(addressDto.phone())
                .isDefault(addressDto.isDefault())
                .unitNumber(addressDto.unit())
                .users(usersList)
                .street(addressDto.street())
                .zipCode(addressDto.zipcode())
                .build();

        return addressRepository.save(address);
    }

    @Override
    public Address findAddressById(Long addressId) throws AddressNotFoundException {
        Optional<Address> addressDb = addressRepository.findById(addressId);
        if (addressDb.isEmpty()) {
            throw new AddressNotFoundException("Address Not Found");
        }
        return addressDb.get();
    }

    /***
     * @desc Get the current authenticated user from security context holder.
     * use userId to find all addresses associated to user
     * @return List of addresses associated user.
     */
    @Override
    public List<Address> getCurrentUserAddress() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByEmailIgnoreCase(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User foundUser = user.get();
        //  return addressRepository.findAddressesByUserId();
        return addressRepository.findAddressesByUserId(foundUser.getId());
    }


    /**
     * @return Default user address
     * @desc Gets current signed-in user and passes its id to repository to find default address
     */
    @Override
    public Address getDefaultUserAddress() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailIgnoreCase(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return addressRepository.findDefaultUserAddress(user.getId());
    }
}
