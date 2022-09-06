import React from 'react'
import { useState } from 'react';
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import { Component } from 'react'

export default class ManageExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day : "",
      month : new Date().getMonth(),
      year: new Date().getFullYear(),
    }

    //method binding
    this.setSelectedDay = this.setSelectedDay.bind(this);
    this.setSelectedMonth = this.setSelectedMonth.bind(this);
    this.setToday = this.setToday.bind(this);
    this.setSelectedYear = this.setSelectedYear.bind(this);
  }

  setSelectedDay(event){
    alert(event);
    this.setSate({day: event.target.value});
    alert("month is "+this.state.month)
  }

  setSelectedMonth(event) {
    this.setState({month: event.target.value});
    alert("month type is "+this.typeOf(this.state.month))
  }

  setToday(event){
    this.setState({month: new Date().getMonth()});
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
          <form action="">
            <table  id="manage-expenses">
              <tr>
                <td><u>Step 1]: Create Categories</u></td>
              </tr>
              <br />
              <tr>
                <td>
                   <input type="text"  id="" name=""  placeholder='enter category'/>
                </td>
                <td>
                  <button type="submit" >Create Category</button>
                </td>
              </tr>
              <br />
              <tr>
                <td><u>Step 2]: Select date to add expenses </u></td>
              </tr>
              <tr>
                <td align='right' > <label htmlFor="">{'    '} Day:</label>  </td>
                <td align='right'>
                  <select name="days" id="" style={{width:40}} defaultValue={new Date().getDate()}>          
                    {  
                      createDayArray(this.state.year,this.state.month).map((day) => {
                        return (<option  value={day}>{day}</option>);
                      })
                    }
                  </select>
                </td>
                <td align='right' >Month: </td>
                <td>
                  <select name="months" id="month" defaultValue={new Date().getMonth()} onClick={this.setSelectedMonth}>            
                    {
                      createMonthArray().map((month) => {
                        return (<option value={month}>{month}</option>);
                      })
                    }
                  </select>
                </td>
                
                <td align='right' >Year: </td>
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
              <tr>
                <td><u>Step 3]: Add expenses for date : </u></td>
              </tr>
              
            </table>
        </form>
      </div>
  )
}
}