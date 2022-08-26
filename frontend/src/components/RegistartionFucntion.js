import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

export default function RegistartionFucntion() {
    let history = useHistory();
    this.state = {  username: '',
                    password: "",
                 };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.navigateToLogin = this.navigateToLogin.bind(this);

    function handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    
    function handleChangePassword(event) {
          this.setState({password: event.target.value});
    }

    function  handleSubmit(event) {
        alert('A name was submitted: ' + this.state.password);
        window.fetch(
          "http://localhost:8080/register", 
          {
              'method': 'POST',
              'mode': 'cors',
              headers: {
                  'Content-Type': 'application/json',
              },
              'body': JSON.stringify( {   'username':this.state.username,
                                          "password":this.state.password,
                                      }
                                    )
          }
          )
          .then(
               (resp)=> resp.json()
               
          )
          .then(
              (jsonData)=> {
                    console.log(jsonData);
                    history.push("/login");
                  //this.props.history.push("/login");
                  //console.log(this);  
              }         
          )
        event.preventDefault(); 
      }
  return (
         <section>
            <div className='register'>
                <div className='col-1'>
                    <h1><u>Expense Manager</u></h1>
                <h2>Register</h2>
                <span>
                        Register to enjoy the service
                </span>
                <form method= "POST" id="form" className='flex flex-col'>
                        <input type="text" value={this.state.username} onChange={handleChangeUsername} placeholder='username'/>
                        <input type="text"  placeholder='password'/>
                        <input type="text" value={this.state.password} onChange={handleChangePassword} placeholder='confirm password'/>
                        <button className='btn' type='submit' onClick={handleSubmit}>Register</button>
                </form>
                Already registered?<span id="login"><button className='login_btn'>Login</button></span>
                </div>
            </div>
        </section>
  )
}
