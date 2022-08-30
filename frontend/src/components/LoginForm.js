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
                    if(status === "username password matched") {
                       window.location.href = "http://localhost:3000/expensemanager";
                    }
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
      const buttonStyle = {width: 100};
      return (
        <section>
            <div>
                <div>
                    <h1><u>Expense Manager</u></h1>
                <h2>Login</h2>
                <form method= "POST" id="form">
                        <label><h6>{this.state.loginMessageToDisplay}</h6></label>
                        <table>
                          <tr>
                            <td>
                              Username: 
                            </td>
                            <td>
                              <input type="text" value={this.state.username} onChange={this.handleChangeUsername} placeholder='username' />
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td>
                            Password:
                            </td>
                            <td>
                               <input type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder='password' />
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td>

                            </td>
                            <td>
                              <button  type='submit' onClick={this.handleSubmit}>Login</button> 
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td>
                                Not registered?
                            </td>
                            <td align="left">
                                <Link to="/registration"><button>Register</button></Link>
                            </td>
                          </tr>
                        </table>                     
                </form>
                    
                </div>
            </div>
        </section>
      );
    }
  }


export default LoginForm;