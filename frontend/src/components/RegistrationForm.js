import React from 'react'
import {Link} from "react-router-dom"

class RegistrationForm extends React.Component {
    
    constructor(props) {
      super(props);

      var goToSubmit = false;

      this.state = {    username: '',
                        password: "",
                        temppassword: "",
                        messageToDisplay: "",
                   };
  
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.showResponseMessage = this.showResponseMessage.bind(this);
      this.areAllFieldsFilled = this.areAllFieldsFilled.bind(this);
      this.handleChangeTempPassword = this.handleChangeTempPassword.bind(this);
      this.doPasswordsMatch = this.doPasswordsMatch.bind(this);
      //this.navigateToLogin = this.navigateToLogin.bind(this);
      //his.forceState = this.forceState.bind(this);
    }
    
    handleChangeUsername(event) {
      this.setState({username: event.target.value});
    }

    handleChangeTempPassword(event) {
      this.setState({temppassword: event.target.value});
    }

    showResponseMessage(message) {
      this.setState({messageToDisplay: message});
    }
  
    handleChangePassword(event) {
        this.setState({password: event.target.value});
     }

     areAllFieldsFilled() {
        if((this.state.username == "" )|| (this.state.temppassword == "") || (this.state.password == "")) {
          return false;
        }else{
          return true;
        }
     }

     doPasswordsMatch(password,confirmPassword) {
      //alert("function called");
        if (password !== confirmPassword) {
            return false;
        }else{
          return true;
        }
     }
    /*navigateToLogin() {
      //let history = useHistory();
      //history.push("/login");
      //this.props.history.push("/login");
    }*/
    
    handleSubmit(event) {
      var password1 = this.state.password;
      var password2 = this.state.temppassword;
      //console.log("before if");
      if(this.areAllFieldsFilled()) {
         if (!this.doPasswordsMatch(password1,password2)) {
             //console.log("inside if");
             this.showResponseMessage("Password and Confirm Password did not match");
         }else{
            this.goToSubmit = true;
         }
      }else{
        this.showResponseMessage("Please fill all the fields");
      }
      if (this.goToSubmit) {
        var p1 = window.fetch(
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
          );
          var p2 = p1.then(
            
            (resp)=> (resp.text())
            
       );
       p2.then(
           (message)=> {
             //console.log(jsonData);
             this.showResponseMessage(message);
             if (message == "done") {
               window.location.href = "http://localhost:3000/login";
             }   
           }
           //this.props.navigation.navigate("/login")    
       )
       .catch(
         (err) =>{
           console.error("Error: ");
           console.error(err);
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
            <div>
                <div>
                    <h1><u>Expense Manager</u></h1>
                <h2>Register</h2>
                <br />
                <form method= "POST" id="form" className='flex flex-col'>
                        <label><h6>{this.state.messageToDisplay}</h6></label>
                        <table>
                          <tr>
                            <td>
                              Username:
                            </td>
                            <td>
                              <input type="text" value={this.state.username} onChange={this.handleChangeUsername} placeholder='username'/>
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td>
                              Password:
                            </td>
                            <td>
                              <input type="password"  value={this.state.temppassword} onChange={this.handleChangeTempPassword} placeholder='password'/>
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td>
                              Confirm Password:
                            </td>
                            <td>
                              <input type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder='confirm password'/>
                            </td>
                          </tr>
                          <br />
                          <tr>
                             <td>

                             </td>
                              <td>
                                <button type='submit' onClick={this.handleSubmit}>Register</button>
                              </td>
                          </tr>
                        </table>
                </form>
                <br />
                Already registered?<span id="login"><Link to="/login"><button className='login_btn'>Login</button></Link></span>
                </div>
            </div>
        </section>
      );
    }
  }

  export default RegistrationForm;