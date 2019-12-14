package com.first.app.SimpleApp.repository;

import com.first.app.SimpleApp.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
