package com.kardim.menu.controllers;

import com.kardim.menu.models.MenuItem;
import com.kardim.menu.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MenuController {

    private final MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/menu")
    public List<MenuItem> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }

    @GetMapping("/menu/search")
    public List<MenuItem> searchMenuItems(@RequestParam String dishName) {
        System.out.println("using search " + dishName);
        return menuService.getBySearch(dishName);
    }

}
