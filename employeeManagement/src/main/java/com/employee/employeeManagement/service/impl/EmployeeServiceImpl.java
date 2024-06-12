package com.employee.employeeManagement.service.impl;

import com.employee.employeeManagement.dto.EmployeeDto;
import com.employee.employeeManagement.entity.Employee;
import com.employee.employeeManagement.exception.ResourceNotFound;
import com.employee.employeeManagement.repository.EmployeeRepo;
import com.employee.employeeManagement.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private ModelMapper modelMapper;
   @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDTO) {
        Employee employee = this.mapToEmployee(employeeDTO);
        Employee savedEmployee =  this.employeeRepo.save(employee);
        return this.mapToEmployeeDTO(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
       Employee employee = this.employeeRepo.findById(employeeId)
               .orElseThrow(() -> new ResourceNotFound("Employee doesn't exist with this id: " + employeeId));
        return this.mapToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees= this.employeeRepo.findAll();
        return employees.stream().map((employee) -> this.mapToEmployeeDTO(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = this.employeeRepo.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFound("Employee doesn't exist with this id: " + employeeId));
        employee.setName(updatedEmployee.getName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setDepartment(updatedEmployee.getDepartment());
        employee.setPhone(updatedEmployee.getPhone());

        Employee updatedEmployeeObj =  employeeRepo.save(employee);
        return this.mapToEmployeeDTO(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = this.employeeRepo.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFound("Employee doesn't exist with this id: " + employeeId));
        this.employeeRepo.deleteById(employeeId);
    }

    public EmployeeDto mapToEmployeeDTO(Employee savedEmployee) {
        EmployeeDto employeeDTO = modelMapper.map(savedEmployee, EmployeeDto.class);
        return  employeeDTO;
    }

    public Employee mapToEmployee(EmployeeDto employeeDTO){
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        return employee;
    }

}
