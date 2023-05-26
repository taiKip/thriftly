package com.example.api.orderitem;

import com.example.api.order.Order;
import com.example.api.product.OutOfStockException;
import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import com.example.api.product.ProductService;
import com.example.api.utils.UtilityFunctions;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {
    private final ProductService productService;
    private final OrderItemRepository orderItemRepository;
    private final UtilityFunctions utilityFunctions;
private final OrderItemDtoMapper orderItemDtoMapper;
    @Override
    @Transactional
    public OrderItem createNewOrderItem(OrderItemDto orderItemDto, Order order) throws ProductNotFoundException, OutOfStockException {
        Product productDb = productService.findProductById(orderItemDto.productId());
        if (orderItemDto.quantity() > productDb.getStock()) {
            throw new OutOfStockException(String.format("The maximum quantity you can buy is %d ", productDb.getStock()));
        }

        OrderItem orderItem = OrderItem
                .builder()
                .subtotal(utilityFunctions.calculateSubTotal(productDb.getPrice(), orderItemDto.quantity()))
                .quantity(orderItemDto.quantity())
                .product(productDb)
                .order(order)
                .build();
productService.updateStock(orderItemDto.productId(),orderItemDto.quantity());
        return orderItemRepository.save(orderItem);
    }

    @Override
    public Double getTotalSum(Long id) {

        return orderItemRepository.findTotalSumAmountOfOrder(id);
    }

    @Override
    public List<OrderItemResponseDto> fetchAllItems(Long id) {
        List<OrderItemResponseDto> orderItems = new ArrayList<>();
        return orderItemRepository.findAllItemsByOrderId(id).stream().map(
                orderItemDtoMapper
        ).collect(Collectors.toList());
    }
}
