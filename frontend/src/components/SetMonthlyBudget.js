import React from 'react'
import { useState, useEffect } from 'react';

export default function SetMonthlyBudget() {
    const [categoryList, setCategoryList] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [amount,setAmount] = useState(null);

    const sessionInfo = JSON.parse(window.localStorage.getItem("session"));

    const showCategoryList = function () {
        if (categoryList == null) {
            var payload = {
                'session_id': sessionInfo._id
            }
            var requestOptions = {
                'method': 'POST',
                'body': JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            window.fetch("http://localhost:8080/myCategories", requestOptions).then(
                (response) => response.json()
            ).then(
                (rsp) => {
                    console.log(rsp);
                    setCategoryList(rsp.data.categories);
                }
            )
        }
    }

    function handleSelectCategory(e) {
        setCategoryId(e.target.value);
    }

    function handleAmountChange(e) {
        setAmount(e.target.value);
    }

    function handleSetBudget(e) {
        //console.log(amount);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "connect.sid=s%3Af52647f8-0374-4add-a9f4-1247d3d3bffb.11Mnjp0%2Bn%2BuScB6AFwVeZA592tAwMH0EzQWJRasP09A");

        var raw = JSON.stringify({
            "session_id": sessionInfo._id,
            "category_id": categoryId,
            "amount": amount,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/setBudget", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                alert("Your monthly budget has been set to Rs. "+amount)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        showCategoryList();
    })


    return (
        <div className="container">
            <div className="row mt-5">
                {/*<div className="col">
                    <label htmlFor="categories">Select Category</label>
                    <select onChange={handleSelectCategory} id="categories" className="form-select" aria-label="Default select example">
                        {categoryList ? categoryList.map((category) => <option value={category._id} key={category.category_name}>{category.category_name}</option>) : null}
                    </select>
                 </div>*/}
                <div className="col">
                    <div style={{ height: 70 }} className="input-group mt-4">
                        <select onChange={handleSelectCategory} id="categories" className="form-select" aria-label="Default select example">
                            <option value="" selected>Select category</option>
                            {categoryList ? categoryList.map((category) => <option value={category._id} key={category.category_name}>{category.category_name}</option>) : null}
                        </select>
                        <input onChange={handleAmountChange}type="text" className="form-control" placeholder="Enter budget amount" aria-label="budget-amount" aria-describedby="button-addon2" />
                        <button onClick={handleSetBudget} className="btn btn-success" type="button" id="button-addon2">Set Budget</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
