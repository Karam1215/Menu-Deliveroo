package com.kardim.menu.repositories;

import com.kardim.menu.models.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MenuRepository extends JpaRepository<MenuItem, Integer> {
    MenuItem findByName(String dishName);
    List<MenuItem> findByNameIgnoreCase(String dishName);
}
