package com.example.api.orderitem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query(value = "SELECT SUM(subtotal) FROM order_item WHERE order_id = ?1", nativeQuery = true)
    Double findTotalSumAmountOfOrder(Long orderId);

    @Query(value = "SELECT * FROM order_item WHERE order_id = ?1",nativeQuery = true)
    List<OrderItem> findAllItemsByOrderId(Long orderId);
}
