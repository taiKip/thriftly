package com.example.api.orderstatus;

import com.example.api.error.DataNotSaved;
import com.example.api.error.DuplicateException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderStatusServiceImpl implements OrderStatusService{
    private final OrderStatusRepository orderStatusRepository;
    @Override
    public String createOrderStatus(OrderStatusDto orderStatusDto) throws DuplicateException, DataNotSaved {
        Optional<OrderStatus> duplicate = orderStatusRepository.findByStatusIgnoreCase(orderStatusDto.name());
        if(duplicate.isPresent()){
            throw new DuplicateException("A duplicate status exists");
        }
        OrderStatus orderStatus = OrderStatus
                .builder()
                .status(orderStatusDto.name())
                .build();
        try{
           orderStatusRepository.save(orderStatus) ;
        }catch (Exception e){
            throw new DataNotSaved("Something went wrong.");
        }
        return String.format("%s as status has been added",orderStatusDto.name());
    }

    @Override
    public List<OrderStatus> getOrderStatusList() {

        return orderStatusRepository.findAll();
    }

    @Override
    public OrderStatus updateOrderStatus(Long id, OrderStatusDto orderStatusDto) throws OrderStatusNotFoundException {
        Optional<OrderStatus> orderStatusDb= orderStatusRepository.findById(id);
        if(orderStatusDb.isEmpty()){
            throw new OrderStatusNotFoundException("Order status not found");
        }
        OrderStatus foundOrderStatus = orderStatusDb.get();
        if(!foundOrderStatus.getStatus().equalsIgnoreCase(orderStatusDto.name())){
            return null;
        }else {
             foundOrderStatus.setStatus(orderStatusDto.name());
        }

        return orderStatusRepository.save(foundOrderStatus);
    }

    @Override
    public OrderStatus findOrderStatusByName(String statusName) throws OrderStatusNotFoundException {
        Optional<OrderStatus> orderStatus = orderStatusRepository.findByStatusIgnoreCase(statusName);
        if(orderStatus.isEmpty()){
            throw new OrderStatusNotFoundException("Order status not found");
        }
        return orderStatus.get();
    }

    @Override
    public String deleteOrderStatus(Long id) throws OrderStatusNotFoundException {
        Optional<OrderStatus> orderStatus = orderStatusRepository.findById(id);
        if(orderStatus.isEmpty()){
            throw new OrderStatusNotFoundException("Order status not found");
        }
        orderStatusRepository.deleteById(id);

        return String.format("%s status deleted",orderStatus.get().getStatus());
    }
}
