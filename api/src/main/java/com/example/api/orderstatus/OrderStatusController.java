package com.example.api.orderstatus;

import com.example.api.error.DataNotSaved;
import com.example.api.error.DuplicateException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/order-status")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
public class OrderStatusController {
    private final OrderStatusService orderStatusService;
    @PostMapping
    public ResponseEntity<String> createOrderStatus(@RequestBody @Valid OrderStatusDto orderStatusDto) throws DuplicateException, DataNotSaved {
        return ResponseEntity.ok(orderStatusService.createOrderStatus(orderStatusDto));
    }
    @GetMapping
    public ResponseEntity<List<OrderStatus>> getOrderStatusList(){
        return ResponseEntity.ok(orderStatusService.getOrderStatusList());
    }
    @PutMapping("/{id}")
    public ResponseEntity<OrderStatus> updateOrderStatus(@PathVariable("id") Long id,@RequestBody @Valid OrderStatusDto orderStatusDto)
            throws OrderStatusNotFoundException {
        return ResponseEntity.ok(orderStatusService.updateOrderStatus(id,orderStatusDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStatusById(@PathVariable("id") Long id)
            throws OrderStatusNotFoundException {
        return ResponseEntity.ok(orderStatusService.deleteOrderStatus(id));
    }
    @GetMapping("/search")
    public ResponseEntity<OrderStatus> searchOrderStatusByName(@RequestParam(value = "name") String statusName) throws OrderStatusNotFoundException {
        return  ResponseEntity.ok(orderStatusService.findOrderStatusByName(statusName));
    }
}
