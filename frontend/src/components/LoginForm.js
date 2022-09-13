import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Stack from "react-bootstrap/Stack"

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
        this.callLogin();
      }
      
      event.preventDefault();
    }
     callLogin = async() => {
      console.log("incallLogin")
      await fetch(
        "http://localhost:8080/login", 
        {
            'method': 'POST',
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
            (resp)=> {
              if(resp){
                console.log(resp.body)
                 return resp.json()
            }
              else 
              throw new Error("no resp")
              }
        )
        .then(
            (responseJson)=> {
                console.log(responseJson);
               //
                window.localStorage.setItem("session",JSON.stringify(responseJson.data.session));
                window.localStorage.setItem("username",JSON.stringify(responseJson.data.username));
                window.location.href = "http://localhost:3000/expensemanager";
            }
        )
        .catch((err)=>{
          console.log(err);
        }) 

    }
  //window.location.href = "http://localhost:3000/expensemanager";
    /*forceState(event) {
        this.setState({value: "Deepesh"});
        event.preventDefault();
      }*/
     


    render() {
      const buttonStyle = {width: 100};
      const textBoxStyle = {width:10};
      return (
        <section>
            <div>
                <div id="formdiv">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                <center> 
                  <h2>Log in</h2>
                  <br />
                <div className="form-floating mb-3">
                  <input style={{width:"25%"}} value={this.state.username} onChange={this.handleChangeUsername} type="email" className="form-control" id="username"/>
                  <label for="username">Enter Username</label>
                </div>
                <div className="form-floating">
                  <input style={{width:"25%"}} type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" id="floatingPassword"/>
                  <label for="floatingPassword">Enter Password</label>
                </div>
                <br />
                <Stack gap={2} className="col-md-5 mx-auto">
                      <div className="mb-2">
                            <Button style={{width:"60%"}} variant="primary" size="lg" onClick={this.handleSubmit}>
                                Login
                            </Button>
                      </div>
                      <div className="mb-2">
                        Not registered ?
                      <Link to="/registration">     
                          Register
                        </Link>
                      </div>
                    </Stack>
                {/* <Form>
                    <Form.Group className="mb-3" size="sm" >
                      <Form.Label>Username</Form.Label>
                      <Form.Control style={{width:"25%"}} value={this.state.username} onChange={this.handleChangeUsername} placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control style={{width:"25%"}} type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Stack gap={2} className="col-md-5 mx-auto">
                      <div className="mb-2">
                            <Button style={{width:"60%"}} variant="primary" size="lg" onClick={this.handleSubmit}>
                                Login
                            </Button>
                      </div>
                      <div className="mb-2">
                      <Link to="/registration">
                            <Button style={{width:"60%"}} variant="primary" size="lg" >
                                Register
                            </Button>
                        </Link>
                      </div>
                    </Stack>
      </Form>*/}

                {/*<form method= "POST" id="form">
                        <h1><u>Expense Manager</u></h1>
                        <h2>Login</h2>
                        <label><h6>{this.state.loginMessageToDisplay}</h6></label>
                        <center><table id="login-form-table">
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
                            <td>*/}
                              {/*<button  type='submit' >Login</button> */}
                              
                           { /*</td>
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
                        </center>                   
                          </form>*/}
                </center> 
                </div>
            </div>
        </section>
      );
    }
  }


export default LoginForm;