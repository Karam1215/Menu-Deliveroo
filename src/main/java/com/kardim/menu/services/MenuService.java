package com.kardim.menu.services;

import com.kardim.menu.models.MenuItem;
import com.kardim.menu.repositories.MenuRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@Transactional
public class MenuService {
    private final MenuRepository menuRepository;
    @Autowired
    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getAllMenuItems(){
        System.out.println("hereeeeeeeeeeeeeeeeee");
        return menuRepository.findAll();
    }

    public List<MenuItem> getBySearch(String name){
        return menuRepository.findByNameIgnoreCase(name);
    }


}
