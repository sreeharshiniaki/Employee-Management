import React, { useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import './EmployeeDashboard.css'

const EmployeeDashboard = () => {
    const [employees, setEmployees] =  useState( [] )

    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
        
    }, [] )

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })

    }

    const updateEmployee = (employeeId) => {
        navigate(`/employees/${employeeId}`)
    }

    const removeEmployee = (employeeId) => {
        console.log(employeeId);
        deleteEmployee(employeeId).then((response)=>{
            getAllEmployees();
        }).catch(error => {
            console.error(error);
            alert("OOPS! Employee data is not deleted. ")
        })    
        alert("Employee deleted successfully!");

    }

  return (
    
    <div className='container'>
        <br></br>
        <h2 className='text-center fw-bold fonts'>Employees Dashboard</h2>
        <br></br>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr className='fonts'>
                    <th >Id</th>
                    <th >Employee Name</th>
                    <th >Email Id</th>
                    <th >Department</th>
                    <th >Phone</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody>
                { employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <button className='btn btn-info padding' onClick={() => updateEmployee(employee.id)} >Update</button>{" "}
                                <button className='btn btn-danger padding' onClick={() => removeEmployee(employee.id)} >Delete</button>
                            </td>
                        </tr>))
                }
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeDashboard