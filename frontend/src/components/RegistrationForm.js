import React from 'react'
//import {useHistory,withRouter} from "react-router-dom"

class RegistrationForm extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {    username: '',
                        password: "",
                   };
  
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.navigateToLogin = this.navigateToLogin.bind(this);
      //his.forceState = this.forceState.bind(this);
    }
    
    handleChangeUsername(event) {
      this.setState({username: event.target.value});
    }
  
    handleChangePassword(event) {
        this.setState({password: event.target.value});
     }

    /*navigateToLogin() {
      //let history = useHistory();
      //history.push("/login");
      //this.props.history.push("/login");
    }*/
    
    handleSubmit(event) {
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
            
             (resp)=> {
                console.log(resp);        
             }
             
        )
        .then(
            (jsonData)=> {
                console.log(jsonData);
                window.location.href = "http://localhost:3000/login";
            }
            //this.props.navigation.navigate("/login")    
        )
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
                <h2>Register</h2>
                <span>
                        Register to enjoy the service
                </span>
                <form method= "POST" id="form" className='flex flex-col'>
                        <input type="text" value={this.state.username} onChange={this.handleChangeUsername} placeholder='username'/>
                        <input type="text"  placeholder='password'/>
                        <input type="text" value={this.state.password} onChange={this.handleChangePassword} placeholder='confirm password'/>
                        <button className='btn' type='submit' onClick={this.handleSubmit}>Register</button>
                </form>
                Already registered?<span id="login"><button className='login_btn'>Login</button></span>
                </div>
            </div>
        </section>
      );
    }
  }

  export default RegistrationForm;