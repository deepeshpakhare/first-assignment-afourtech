import React from 'react'
import { useState } from 'react';
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import { Component } from 'react'

export default class ManageExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      category: "",
    }

    //method binding
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    //this.setDate = this.setDate.bind(this);
  }

  handleCreateCategory(event){
    window.fetch(
      "http://localhost:8080/createCategory", 
      {
          'method': 'POST',
          'mode': 'cors',
          headers: {
              'Content-Type': 'application/json',
          },
          'body': JSON.stringify( {   
                                      'category':this.state.category,
                                  }
                                )
      }
      )
      .then(
          (resp)=> resp
      )
      .then(
          (resp)=> {
            alert(resp.text())
          }
      )
event.preventDefault();
}
  

  handleChangeCategory(event) {
    this.setState({category: event.target.value});
  }

  setDate = date => this.setState({date:date})

  render() {
    /*const monthArray = [
      31,28,31,30,31,30,31,31,30,31,30,31
    ];

    const isCenturyYear = (year) => {
      if(year % 100 == 0) {
        return true;
      }else{
        return false;
      }
    }
    const isLeapYear = (year) => {
      if (isCenturyYear(year)) {
        if (year % 400 == 0) {
            return true;
        }else{
          return false;
        }
      }else{
        if (year % 4 == 0) {
          return true;
        }else{
          return false;
        }
      }
    }

    const createDayArray = (year,monthNumber) => {
      var array = [];
      for (let x = 1; x <= monthArray[monthNumber-1]; x++) {
            array[x-1] = x;
            if (isLeapYear(year) && (monthNumber == 2)) {
                array.push(29);
            }
      }
      return array;
    }

    const createMonthArray = () => {
      var array = [];
      for(var a in monthArray) {
        array[a] = parseInt(a)+1;
      }
      return array;
    }

    const yearArray = () => {
      var array = [];
      for (var year = 1900; year <= new Date().getFullYear(); year++) {
        array[year-1900] = year;
      }
      return array;
    }
    */

  return (
    <div  >
        <br /><br />
          <form method="post">
            <table  id="manage-expenses">
              <tr>
                <td><u>Step 1]: Create Categories</u></td>
              </tr>
              <br />
              <tr>
                <td>
                   <input type="text"  id="category"  value={this.state.category} onChange={this.handleChangeCategory} placeholder='enter category'/>
                </td>
                <td>
                  <button type="submit" onClick={this.handleCreateCategory}>Create Category</button>{this.state.category}
                </td>
                </tr>
            </table>
            <table id="manage-expenses">
              <br />
              <tr>
                <td><u>Step 2]: Select date to add expenses </u></td>
              </tr>
              <br />
              <tr>
                <td>
                  <Calendar onChange={this.setDate} value={this.state.date}></Calendar>
                </td>
              </tr>
              <br />
              <tr>
                <td><u>Step 3]: Add expenses for date :{this.state.date} </u></td>
              </tr>
            </table>
        </form>
      </div>
  )
}
}