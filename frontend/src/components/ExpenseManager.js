import React from 'react'
import {Redirect} from  "react-router-dom"

class ExpenseManager extends React.Component() {
    constructor(props) {
        super(props);
        this.state = {    login: false
                     };
    
        /*this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayLoginMessage = this.displayLoginMessage.bind(this);
        //his.forceState = this.forceState.bind(this);*/
      }
    render() {
        /*if(!this.state.login){
            return <Redirect to="/login"/>
        } */
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
                      Not registered?<button className='btn'>Register</button>
                  </div>
              </div>
          </section>
        );
      }
}

export default ExpenseManager;