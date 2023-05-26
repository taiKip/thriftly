package com.example.api.address;

import com.example.api.error.DataNotSaved;
import org.springframework.stereotype.Service;

@Service
public interface AddressService {
    Address addNewAddress(AddressDto addressDto) throws DataNotSaved;

    Address findAddressById(Long addressId) throws AddressNotFoundException;
}
