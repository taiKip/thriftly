package com.example.api.order;

import com.example.api.address.AddressNotFoundException;
import com.example.api.orderitem.OrderItemDto;
import com.example.api.orderstatus.OrderStatusNotFoundException;
import com.example.api.product.OutOfStockException;
import com.example.api.product.ProductNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService OrderService;
    @PostMapping
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody @Valid OrderDto orderDto) throws ProductNotFoundException,
            OrderStatusNotFoundException, AddressNotFoundException, OutOfStockException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return  ResponseEntity.ok(new OrderResponseDto(auth.getName()));

    }
    @PutMapping("/{orderId}/order-items/{orderItem}")
    public ResponseEntity<String> updateOrder(@PathVariable("orderId")Long orderId,
                                              @PathVariable("orderItem") Long orderItem,
                                              @RequestBody @Valid OrderItemDto orderItemDto){
        return ResponseEntity.ok(OrderService.updateOrder(orderId,orderItem,orderItemDto));
    }
}
