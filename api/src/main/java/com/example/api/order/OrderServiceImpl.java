package com.example.api.order;

import com.example.api.address.Address;
import com.example.api.address.AddressNotFoundException;
import com.example.api.address.AddressService;
import com.example.api.orderitem.OrderItemDto;
import com.example.api.orderitem.OrderItemService;
import com.example.api.orderstatus.OrderStatus;
import com.example.api.orderstatus.OrderStatusNotFoundException;
import com.example.api.orderstatus.OrderStatusService;
import com.example.api.product.OutOfStockException;
import com.example.api.product.ProductNotFoundException;
import com.example.api.user.User;
import com.example.api.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final Logger LOGGER = LoggerFactory.getLogger(LoggerFactory.class);
    private final UserRepository userRepository;
    private final OrderItemService orderItemService;
    private final OrderRepository orderRepository;
    private final OrderStatusService orderStatusService;
    private final AddressService addressService;

    @Override
    @Transactional
    public Map<String, Object> placeOrder(OrderDto orderDto) throws ProductNotFoundException, OrderStatusNotFoundException, AddressNotFoundException, OutOfStockException {

String username = SecurityContextHolder.getContext().getAuthentication().getName();
/**
 * find authenticated user
 */
        Optional<User> userDb = userRepository.findByEmailIgnoreCase(username);
        if(userDb.isEmpty()){
            throw new UsernameNotFoundException("Please sign in to continue");
        }
        OrderStatus orderStatus = orderStatusService.findOrderStatusByName("Pending");
        Address addressDb = addressService.findAddressById(orderDto.addressId());
        /**
         * create new order and  save;
         */
        Order newOrder = Order
                .builder()
                .orderStatus(orderStatus)
                 .user(userDb.get())
                .address(addressDb)
                .build();
        Order savedOrder = orderRepository.save(newOrder);

        for (OrderItemDto orderItemDto : orderDto.orderItems()) {
            orderItemService.createNewOrderItem(orderItemDto, savedOrder);
        }
        Double total = orderItemService.getTotalSum(savedOrder.getId());
        savedOrder.setTotal(total);
        orderRepository.save(savedOrder);
        Map<String,Object> response = new HashMap<>();
        response.put("items",orderItemService.fetchAllItems(savedOrder.getId()));
        response.put("total",total);
        return response;
    }

    @Override
    public String updateOrder(Long orderId, Long orderItem, OrderItemDto orderItemDto) {
        return null;
    }
}
