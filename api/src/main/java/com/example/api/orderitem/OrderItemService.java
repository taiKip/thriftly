package com.example.api.orderitem;

import com.example.api.order.Order;
import com.example.api.product.OutOfStockException;
import com.example.api.product.ProductNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderItemService {
@Transactional
    OrderItem createNewOrderItem(OrderItemDto orderItemDto, Order order) throws ProductNotFoundException, OutOfStockException;

    Double getTotalSum(Long id);

    List<OrderItemResponseDto> fetchAllItems(Long id);
}
