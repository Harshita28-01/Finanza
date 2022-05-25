import React from "react";
import Form from "./Components/Form";
import View from "./Components/View";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Delete from "./Components/Delete";
import Edit from "./Components/Edit";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Form />} />
        <Route path="/view" element={<View />} />
        <Route path="/sign-up" element={<SignUp />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}
