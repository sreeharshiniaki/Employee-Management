import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {

    const navigator = useNavigate();

    function heading(){
        navigator('/home')
    }

    function addNewEmployee(){
        navigator('/add-employee')
    }

  return (
    <Navbar bg="primary" variant="dark">
        <Container>
            <Navbar.Brand to ="/" className = "nav-Link" onClick={heading} style={{fontFamily:'serif', fontSize: '25px'}}><strong>Employee Management</strong></Navbar.Brand>
            <Nav className='ml-auto'>
                <Nav.Link as = {Link} to="/add-employee" className='nav-link' onClick={addNewEmployee} style={{fontFamily:'serif',fontSize:'20px'}}>Add Employee</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default HeaderComponent