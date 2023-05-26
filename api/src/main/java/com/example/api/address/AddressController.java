package com.example.api.address;

import com.example.api.error.DataNotSaved;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/addresses")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
public class AddressController {
    private final AddressService addressService;
    @PostMapping
    public ResponseEntity<Address> addNewAddress(@Valid @RequestBody AddressDto addressDto) throws DataNotSaved {
        return  ResponseEntity.ok(addressService.addNewAddress(addressDto));
    }
}
