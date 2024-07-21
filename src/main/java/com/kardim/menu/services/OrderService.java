package com.kardim.menu.services;

import com.kardim.menu.models.MenuItem;
import com.kardim.menu.models.Order;
import com.kardim.menu.models.OrderItems;
import com.kardim.menu.repositories.MenuRepository;
import com.kardim.menu.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final MenuRepository menuRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, MenuRepository menuRepository) {
        this.orderRepository = orderRepository;
        this.menuRepository = menuRepository;
    }

    public Order placeOrder(Order order) {
        System.out.println("in service");

        // Set the order reference for each OrderItems
        for (OrderItems item : order.getOrderItems()) {
            item.setOrder(order);
        }

        // Save the order with its associated order items
        Order savedOrder = orderRepository.save(order);



        for (OrderItems item : order.getOrderItems()){
            MenuItem menuItem = menuRepository.findByName(item.getDishName());
            if (menuItem!=null){
                int newQnt = menuItem.getQuantity() - item.getQuantity(); // Qnt-quantity after ordering!
                menuItem.setQuantity(newQnt);
                menuRepository.save(menuItem);
            }
            if (menuItem.getQuantity() < item.getQuantity()){
                System.out.println("there is error in quantity");
            }
        }


        System.out.println("Order placed successfully!");
        return savedOrder;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }
}
