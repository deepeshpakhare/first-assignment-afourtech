import React, { useEffect } from 'react'
import { useState } from 'react';
import CategoryList from './CategoryList';

export default function CreateCategoryForm() {
    const [category, setCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(null);

    const sessionInfo = JSON.parse(window.localStorage.getItem("session"));

    function handleChangeCategory(e) {
        if(e.target.value != null) {
            setCategory(e.target.value);
        }
    }

    function handleAddCategory(e) {
        if (category == null || category == "") {
            alert("Category name can not be blank");
        }else{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                'session_id': sessionInfo._id,
                "category_name": category
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch("http://localhost:8080/createCategory", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result); 
                    setCategoryList(null);
                    showCategoryList()
                })
                .catch(error => console.log('error', error));
                setCategory("");
        }
       
    }

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
    useEffect(() => {
        showCategoryList();
    })
    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" id="category" value={category} onChange={handleChangeCategory} placeholder='enter category' />
                        <label for="category">Category Name</label>
                    </div>
                </div>
                <div className="col">
                    <button type="button" class="btn btn-success" style={{ height: '80%', width: '40%' }} onClick={handleAddCategory}>Add</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CategoryList categories={categoryList}></CategoryList>
                </div>
            </div>
        </div>
    )
}
