import React, { Component } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default class ManageExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:"",
      date : "",
      categories: [],
      expense: ""
    }
  }
  

  render() {
    return (
      <div  >
        <br /><br />
          <form action="">
            <table  id="manage-expenses">
              <tr>
                <td><u>Step 1]: Create Categories</u></td>
              </tr>
              <br />
              <tr>
                <td>
                   <input type="text"  id="" name="" value={this.state.category} onChange={this.setCategory} placeholder='enter category'/>
                </td>
                <td>
                  <button>Create Category</button>
                </td>
              </tr>
              <br />
              <tr>
                <td><u>Step 2]: Select date to add expenses </u></td>
              </tr>
              <tr>
                <Calendar />
              </tr>
              <tr>
                <td><u>Step 3]: Add expenses for date : {this.state.date}</u></td>
              </tr>
              
            </table>
        </form>
      </div>
    )
  }
}
