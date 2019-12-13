package com.first.app.SimpleApp.controller;


import com.first.app.SimpleApp.model.Category;
import com.first.app.SimpleApp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    public Collection<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategorieById(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category)throws URISyntaxException {
        Category result=categoryRepository.save(category);
        return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result);
    }

    @PutMapping("/category/{id}")
    ResponseEntity<Category>modifyCategory(@Valid @RequestBody Category category){
        Category result=categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/category/{id}")
    ResponseEntity<?>deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
