package com.employee.employeeManagement.entity;

import com.employee.employeeManagement.Enum.Department;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")

public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "Email_id")
    private String email;
    @Enumerated(EnumType.STRING)
    @Column(name = "Department")
    private Department department;

    @Column(name = "Phone_no.")
    private String phone;
}
