import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login.js";
import Signup from './components/auth/Signup.js';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import Project from './components/Project.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/project' element={<Project/>}/>
      <Route path="*" element={<h1>404 Error Not Found</h1>}/>
    </Routes>
  </Router>
);

