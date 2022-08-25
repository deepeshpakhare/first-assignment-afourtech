import React from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
    return (
      <Router>
        <div className="App">
          <Routes>
              <Route path="/registration" element={<RegistrationForm/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </div>
      </Router>
    );
}
export default App;
