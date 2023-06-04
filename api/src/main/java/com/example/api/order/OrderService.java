package com.example.api.order;

import com.example.api.address.AddressNotFoundException;
import com.example.api.orderitem.OrderItemDto;
import com.example.api.orderstatus.OrderStatusNotFoundException;
import com.example.api.product.OutOfStockException;
import com.example.api.product.ProductNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface OrderService {
    Map<String,Object> placeOrder(OrderDto orderDto) throws ProductNotFoundException, OrderStatusNotFoundException, AddressNotFoundException, OutOfStockException;

    String updateOrder(Long orderId, Long orderItem, OrderItemDto orderItemDto);

    Map<String,Object> fetchOrders(int pageNo, int pageSize);
}
