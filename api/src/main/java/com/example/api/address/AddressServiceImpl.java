package com.example.api.address;

import com.example.api.error.DataNotSaved;
import com.example.api.user.User;
import com.example.api.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Override
    public Address addNewAddress(AddressDto addressDto) throws DataNotSaved {

        Address address = Address
                .builder()
                .city(addressDto.city())
                .phone(addressDto.phone())
                .unitnumber(addressDto.unit())
                .street(addressDto.street())
                .zipcode(addressDto.zipcode())
                .build();
Address newAddress;

        try {
         newAddress= addressRepository.save(address);

        } catch (Exception e) {
            throw new DataNotSaved("Something went wrong.Address not saved");
        }

        return newAddress ;
    }

    @Override
    public Address findAddressById(Long addressId) throws AddressNotFoundException {
        Optional<Address> addressDb = addressRepository.findById(addressId);
        if(addressDb.isEmpty()){
            throw new AddressNotFoundException("Address Not Found");
        }
        return addressDb.get();
    }
}
