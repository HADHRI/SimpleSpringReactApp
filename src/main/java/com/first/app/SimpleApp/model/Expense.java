package com.first.app.SimpleApp.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "expense")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "description",nullable = false)
    private String description;
    @Column(name = "expense_date",nullable = false)
    private Instant expenseDate;
    @Column(name = "location",nullable = false)
    private String location;
    @ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;
    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

}
