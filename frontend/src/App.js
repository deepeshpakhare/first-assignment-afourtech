import React from "react";
import "./App.css"
import {Switch,Route,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Form from "./components/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
    return (
      <div className="App">
        <Form></Form>
      </div>
    );
}
export default App;
