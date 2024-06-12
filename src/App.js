
import './App.css';
import EmployeeComponent from './components/EmployeeComponent';
import EmployeeDashboard from './components/EmployeeDashboard';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';

function App() {
  return (
    <>
     <BrowserRouter>
       <HeaderComponent /> 
        <Routes>
         <Route path='/home' element={<HomeComponent />}></Route>
         <Route path='/employee-list' element={<EmployeeDashboard />}></Route>
         <Route path='/employees' element={<EmployeeDashboard />}></Route>
         <Route path='/add-employee' element={<EmployeeComponent />}></Route>
         <Route path='/employees/:id' element={<EmployeeComponent />}></Route>
        </Routes>
     </BrowserRouter>
    </>
  );
}
export default App;
