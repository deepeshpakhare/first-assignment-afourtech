import React from 'react'
import { useState } from 'react';

export default function CreateCategoryForm() {
    const [category, setCategory] = useState("");
    function handleChangeCategory(e) {
        setCategory(e.target.value);
      }
    
  return (
    <div className='container'>
        <div className="row">
            <div className="col">
                <div className="form-floating mb-3">
                <input className="form-control" type="text" id="category" value={category} onChange={handleChangeCategory} placeholder='enter category' />
                    <label for="category">Category NAme</label>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button type="button" class="btn btn-success">Success</button>
            </div>
        </div>

    </div>
  )
}
