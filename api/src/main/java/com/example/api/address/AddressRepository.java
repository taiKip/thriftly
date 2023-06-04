package com.example.api.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    @Query(value = "SELECT a.* FROM address a JOIN user_address ua ON ua.address_id = a.id WHERE ua.user_id = ?1", nativeQuery = true)
    List<Address> findAddressesByUserId(Long userId);
    @Query(value = "SELECT a.* FROM address a JOIN user_address ua ON ua.address_id = a.id WHERE ua.user_id = ?1 AND is_default = true", nativeQuery = true)
    Address findDefaultUserAddress(Long userId);

}
