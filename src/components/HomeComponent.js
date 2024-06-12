import React from 'react'
import './HomeComponent.css'
import { useNavigate } from 'react-router-dom'

const HomeComponent = () => {

    const navigator = useNavigate();

    function EmployeeDashboard() {
        navigator('/employee-list');
    }
    

  return (
    <div>
        <img src="https://www.kindpng.com/picc/m/239-2394224_collaboration-solutions-advantage-of-the-employee-management-system.png" 
        alt = "..." className="image"></img>

        <div className="d-flex justify-content-center padding" >
         <h2><strong>Employee Data Management</strong></h2>
        </div>
        
        <div align='center'>
            <button className='btn btn-outline-success btn-sm' onClick={EmployeeDashboard}>Employees</button> {" "}
        </div>

    </div>
  )
}

export default HomeComponent