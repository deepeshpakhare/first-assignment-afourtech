import React from 'react'
import {Redirect} from  "react-router-dom"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class ExpenseManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date :"",   
            category:["food","fuel","rent"],
          
        }
        this.handleChangeFood = this.handleChangeFood.bind(this);
        this.handleChangeFuel = this.handleChangeFuel.bind(this);
        this.handleChangeRent = this.handleChangeRent.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    addCategory(){
        console.log("inside add category ");
        this.state.category.push("test");
        alert(this.state.category.length());
    };

    handleChangeFood(event){
        this.setState({food: event.target.value});
    }

    handleChangeFuel(event) {
        this.setState({fuel: event.target.value});
    }

    handleChangeRent(event){
        this.setState({rent: event.target.value});
    }
    render() {
        return (   
        <section>
            <div>
                <div>
                    <h1><u>Expense Manager Page</u></h1>
                    <br />
                    <form id="form">
                        <table>
                            
                                 <tr>
                                    <td>
                                        <h3>Select Date:</h3>
                                    </td>
                                    <td>
                                        <Calendar></Calendar>
                                    </td>
                                 </tr>
                            <br />
                            <br />
                            <tr>
                                <td>
                                    <h3>Food:</h3>
                                </td>
                                <td>
                                    <input type="text" value={this.state.food} onChange={this.handleChangeFood} className='category' placeholder='Expense on Food'/>
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <td>
                                    <h3>Fuel:</h3>
                                </td>
                                <td>
                                    <input type="text"  value={this.state.fuel} onChange={this.handleChangeFuel} className='category' placeholder="Expense on Fuel"/>
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <td>
                                    <h3>Rent:</h3>
                                </td>
                                <td>
                                <input type="text" value={this.state.rent} onChange={this.handleChangeRent} className='category' placeholder='Expense on rent'/>
                                </td>
                            </tr>
                            <br />
                            <br />
                            <tr>
                                <td><h3>New category name:</h3></td>
                                <td><input type="text" id="newCategoryTag" value={this.state.newCategory}  className='category'/></td>
                                <td><button onClick={this.addCategory}>Add category</button></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
         </section>
        );
      }
}

export default ExpenseManager;