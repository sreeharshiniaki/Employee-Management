package com.employee.employeeManagement.dto;

import com.employee.employeeManagement.Enum.Department;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDto {

    private Long id;
    @Valid
    @NotBlank(message = "Name is mandatory")
    @NotNull(message = "Name is mandatory")
    @Size(min=2,max=20,message = "Name can't exceed 20 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @NotNull(message = "Email is required")
    private String email;
    @Enumerated(EnumType.STRING)
    private Department department;

    @NotBlank(message = "Phone is required")
    @NotNull(message = "Phone is required")
    @Size(min=0,max=10,message = "Phone number contains 10digits")
    private String phone;
}
