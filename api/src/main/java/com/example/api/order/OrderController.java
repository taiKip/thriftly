package com.example.api.order;

import com.example.api.address.AddressNotFoundException;
import com.example.api.orderitem.OrderItemDto;
import com.example.api.product.OutOfStockException;
import com.example.api.product.ProductNotFoundException;
import com.example.api.utils.AppConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("api/v1/orders")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Orders")
public class OrderController {
    private final OrderService orderService;

    @Operation(
            description = "Post endpoint for placing an order",
            summary = "Place an order"
    )
    @PostMapping
    public ResponseEntity<Map<String, Object>> placeOrder(@RequestBody @Valid OrderDto orderDto) throws ProductNotFoundException,
             AddressNotFoundException, OutOfStockException {

        return ResponseEntity.ok(orderService.placeOrder(orderDto));

    }

    @PutMapping("/{orderId}/order-items/{orderItem}")
    @PreAuthorize("hasAuthority('management:create')")
    public ResponseEntity<String> updateOrder(@PathVariable("orderId") Long orderId,
                                              @PathVariable("orderItem") Long orderItem,
                                              @RequestBody @Valid OrderItemDto orderItemDto) {
        return ResponseEntity.ok(orderService.updateOrder(orderId, orderItem, orderItemDto));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('management:create')")
    public ResponseEntity<Map<String, Object>> fetchOrders(
            @RequestParam(value = "pageNo", defaultValue
                    = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue
                    = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ) {
        return ResponseEntity.ok(orderService.fetchOrders(pageNo, pageSize));
    }
}
