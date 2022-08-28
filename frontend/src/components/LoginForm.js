import React from "react";
import {Link} from "react-router-dom";

class LoginForm extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {    username: '',
                        password: "",
                        loginMessageToDisplay : ""
                   };
  
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.displayLoginMessage = this.displayLoginMessage.bind(this);
      //his.forceState = this.forceState.bind(this);
    }

    displayLoginMessage(message) {
        this.setState({loginMessageToDisplay: message});
    }

    handleChangeUsername(event) {
      this.setState({username: event.target.value});
    }
  
    handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.password);
      if (this.state.username == "" || this.state.password == "") {
         this.displayLoginMessage("Please fill username and password both");
      } else {
        window.fetch(
            "http://localhost:8080/login", 
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
                (resp)=> resp.text()
            )
            .then(
                (status)=> {
                    console.log(status);
                    this.displayLoginMessage(status);
                }
            )
      }
      
      event.preventDefault();
    }
  
    /*forceState(event) {
        this.setState({value: "Deepesh"});
        event.preventDefault();
      }*/

    render() {
      return (
        <section>
            <div className='register'>
                <div className='col-1'>
                    <h1><u>Expense Manager</u></h1>
                <h2>Login</h2>
                <span>
                        Login
                </span>
                <form method= "POST" id="form" className='flex flex-col'>
                        <label><h4>{this.state.loginMessageToDisplay}</h4></label>
                        <input type="text" value={this.state.username} onChange={this.handleChangeUsername} placeholder='username' />
                        <input type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder='password' />
                        <button className='btn' type='submit' onClick={this.handleSubmit}>Login</button>
                </form>
                    Not registered?<Link to="/registration"><button className='btn'>Register</button></Link>
                </div>
            </div>
        </section>
      );
    }
  }


export default LoginForm;