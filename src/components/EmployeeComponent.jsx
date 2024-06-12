import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { createEmployee, updateEmployee, listEmployees} from '../services/EmployeeService'
import { getEmployee } from '../services/EmployeeService'
import './EmployeeComponent.css'

export const EmployeeComponent =(employees) => {

    const navigator = useNavigate();
    const{id} =  useParams();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [phone, setPhone] = useState('')
    const [employeess, setEmployees] =  useState( [] )
    const [toggle, setToggle] = useState(true);

    const[validations, setValidations] =  useState({
        name: '',
        email: '',
        department:'',
        phone: ''
    })

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) =>{
                setName(response.data.name)
                setEmail(response.data.email)
                setDepartment(response.data.department)
                setPhone(response.data.phone)
            }).catch(error=>{
                console.error(error);
            })
        }
    },[id]);

    const handleName = (e) => {setName(e.target.value);}
    const handleEmail = (e) => setEmail(e.target.value);
    const handleDepartment =(e)=> setDepartment(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    },[]);
        
    function isduplicate(name,email,department,phone){
        for (let i = 0; i < employeess.length; i++) {
            // console.log(toggle);
            if (
              employeess[i].name === name &&
              employeess[i].email === email &&
              employeess[i].department === department &&
              employeess[i].phone === phone
            ) {
              setToggle(false);
              return true;
            }
          }
    }


    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if(validateForm() && !isduplicate(name,email,department,phone)){
            const employee = {name,email,department,phone}
            console.log(employee);

            if(id){
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                  }).catch(error=>{
                    console.error(error);
                  })
            }
        }
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {}

    function validateForm(){
        let valid = true;

        const errorsCopy = {...validations}

        if(name.trim()){
            errorsCopy.name='';
        }else{
            errorsCopy.name='Name is required';
            valid=false;
        }

        if(email.trim() && (errorsCopy.email==='')){
            errors.email="Email is required";
        }
        
        if(!validEmail.test(email)){
            errors.email = "Email is invalid";
            valid=false;
            alert("Email is invalid!");
        }

        if(department.trim()){
            errorsCopy.department='';
        }else{
            errorsCopy.department='Department is required';
            valid=false;
        }

        if(phone.trim()){
            errorsCopy.phone='';
        }else{
            errorsCopy.phone='Phone number is required';
            valid=false;
        }

        setValidations(errorsCopy);
        console.log(errorsCopy)

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className="fonts"><strong>Update Employee</strong></h2>
        }else{
            return <h2 className="fonts"><strong>Add Employee</strong></h2>
        }
    }
  return (
    <>
    <div className="container">
            <br /> <br />
            <div className="row">
    
                 <div className="card cardbox col-md-6 offset-md-3 offset-md-3" >
                    <br></br>
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2 ">
                                <input
                                type='text'
                                min="2"
                                maxLength={30}
                                placeholder='Enter Name'
                                name='name'
                                value={name}
                                className={`form-control ${validations.name ? 'is-invalid': ''}`}
                                onChange={handleName}
                                ></input>
                                {validations.name && <div className='invalid-feedback'>{validations.name}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <input 
                                type='email'
                                placeholder='Example@email.com'
                                name='email'
                                value={email} 
                                className={`form-control ${validations.email ? 'is-invalid' : ''}`}
                                onChange={handleEmail}
                                >
                                </input>
                                {validations.email && <div className='invalid-feedback'>{validations.email}</div>}
                            </div>

                            <div className="mb-2 row">
                                <label htmlFor="department" className="col-sm-3 col-form-label">Department:</label>
                                <div className='col-sm-9'>
                                    <select name="department" id="department" className={`form-select form-control ${validations.department ? 'is-invalid' : ''}`} 
                                    onChange={handleDepartment} value={department}>
                                        <option selected>Choose Department</option>
                                        <option value='Development' id='Development'>Development</option>
                                        <option value='Finance' id='Finance'>Finance</option>
                                        <option value='HR' id='HR'>HR</option>
                                        <option value='Marketing' id='Marketing'>Marketing</option>
                                        <option value='Operations' id='Operations'>Operations</option>
                                        <option value='FacilitiesManagement' id='FacilitiesManagement'>FacilitiesManagement</option>
                                    </select>
                                    {validations.department && <div className='invalid-feedback'>{validations.department}</div>}
                                </div>

                            </div>

                            <div className="form-group mb-2">
                                <input 
                                   type='text'
                                   size="10"
                                   placeholder='Enter phone'
                                   name='phone'
                                   value={phone}
                                   className={`form-control ${validations.phone ? 'is-invalid' : ''}` }
                                   onChange={handlePhone}>
                                </input>
                                {validations.phone && <div className='invalid-feedback'>{validations.phone}</div>}
                            </div>
                            <div className="text-center">
                              <button className="btn btn-success" type = "submit" onClick={saveOrUpdateEmployee}>Submit</button>
                            </div>
                        </form>
                    </div>
                 </div>
            
            </div>
        </div>

         {toggle ?(
           <div></div>
            ) : (
            <div className="toggle">
                <div className="alert alert-warning text-center" role="alert" >
                   Data already exists!
               </div>
            </div>  
         )}
    </>
  )
}

export default EmployeeComponent
