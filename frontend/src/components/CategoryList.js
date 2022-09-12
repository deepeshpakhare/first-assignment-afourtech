import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

export default function CategoryList(props) {
    var count = 1;
    const CategoryItem = function (props){
       
        return <tr  className='table table-dark table-hover'><td>{props.count}</td><td>{props.category.category_name}</td></tr>
    }
  return (<table class="table table-dark table-hover" style={{width:790}}>
    <tbody>
    <tr  className='table table-dark table-hover'>
      <td>
        Sr. No.
      </td>
      <td>
        Category Name
      </td>
    </tr>
    {props.categories ? props.categories.map(
        (category)  => <CategoryItem category={category} count={count++}/>
    ) : null}
       
    </tbody>
    </table>
  )
}
//<option value={category._id} key={category.category_name}>{category.category_name}</option>