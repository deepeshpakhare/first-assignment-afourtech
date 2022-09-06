import React from 'react'
import { useState } from 'react';
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import { Component } from 'react'

export default class ManageExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day : new Date().getDate(),
      month : new Date().getMonth(),
      year: new Date().getFullYear(),
      category: "",
    }

    //method binding
    this.setSelectedDay = this.setSelectedDay.bind(this);
    this.setSelectedMonth = this.setSelectedMonth.bind(this);
    this.setToday = this.setToday.bind(this);
    this.setSelectedYear = this.setSelectedYear.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
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

  setSelectedDay(event){
    //alert(event);
    this.setState({day: event.target.value});
    console.log(this.state.day);
    //alert("month is "+this.state.month)
  }

  setSelectedMonth(event) {
    this.setState({month: event.target.value});
    alert("month type is "+this.typeOf(this.state.month))
  }

  setToday(event){
    //this.setState({month: new Date().getMonth()});
  }

  setSelectedYear(event){
    this.setState({year: event.target.value})
  }

  render() {
    const monthArray = [
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
                <td align='right' > <label htmlFor="">{'    '} Day:</label></td>
                <td>
                  <select name="days" id="day"  defaultValue={new Date().getDate()} onClick={this.setSelectedDay}>          
                    {  
                      createDayArray(this.state.year,this.state.month).map((day) => {
                        return (<option  value={day}>{day}</option>);
                      })
                    }
                  </select>
                </td>
                <td >Month: </td>
                <td>
                  <select name="months" id="month" defaultValue={new Date().getMonth()} onClick={this.setSelectedMonth}>            
                    {
                      createMonthArray().map((month) => {
                        return (<option value={month}>{month}</option>);
                      })
                    }
                  </select>
                </td>
                
                <td>Year: </td>
                  <td>
                    <select name="year" id="yearid" style={{width:80}} defaultValue={new Date().getFullYear()} onClick={this.setSelectedYear}>
                    {
                        yearArray().map((year) => {
                          return (<option value={year}>{year}</option>);
                        })
                      }
                    </select>
                  </td>
              </tr>
              <br />
              <tr>
                <td><u>Step 3]: Add expenses for date : {this.state.day}/{this.state.month}/{this.state.year} </u></td>
              </tr>
              
            </table>
        </form>
      </div>
  )
}
}