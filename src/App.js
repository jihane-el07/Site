
import './App.css';
import NavBar from './components/NavBar';
import { Routes,Route } from 'react-router-dom';
import Calculator from './pages/calculatrice/Calcul';
import Home from './pages/Home/Home';
import React from "react";
import Carts from './pages/listeProfils/Carts';
import TodoList from './pages/FocusList/TodoList';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Flags from './pages/flags/Flags';





function App() {
  const location = useLocation();

  useEffect(() => {
    console.log("Current Path:", location.pathname); // Debugging line
  
    if (location.pathname === "/Calcul") {
      document.body.classList.add("calculator-body");
      document.body.classList.remove("home-body", "cards-body", "todo-body", "flags-body");
    } else if (location.pathname === "/Carts") {
      document.body.classList.add("cards-body");
      document.body.classList.remove("home-body", "calculator-body", "todo-body", "flags-body");
    } else if (location.pathname === "/TodoList") {
      document.body.classList.add("todo-body");
      document.body.classList.remove("home-body", "calculator-body", "cards-body", "flags-body");
    } else if (location.pathname === "/Flags") {
      document.body.classList.add("flags-body");
      document.body.classList.remove("home-body", "calculator-body", "cards-body", "todo-body");
    } else {
      document.body.classList.add("home-body");
      document.body.classList.remove("calculator-body", "cards-body", "todo-body", "flags-body");
    }
  }, [location]);
  


  return (
    <div className='containers'>
      <NavBar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Calcul' element={<Calculator/>}/>
      <Route path='/Carts' element={<Carts/>}/>
      <Route path='/TodoList' element={<TodoList/>}/>
      <Route path='/Flags' element={<Flags/>}/>

     </Routes>

    </div>
  );
}

export default App;
