package com.example.api.orderstatus;

import com.example.api.error.DataNotSaved;
import com.example.api.error.DuplicateException;

import java.util.List;

public interface OrderStatusService {
    String createOrderStatus(OrderStatusDto orderStatusDto) throws DuplicateException, DataNotSaved;

    List<OrderStatus> getOrderStatusList();

    OrderStatus updateOrderStatus(Long id, OrderStatusDto orderStatusDto) throws OrderStatusNotFoundException;

    OrderStatus findOrderStatusByName(String statusName) throws OrderStatusNotFoundException;

    String deleteOrderStatus(Long id) throws OrderStatusNotFoundException;
}
