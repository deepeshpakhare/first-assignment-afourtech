import React from 'react'

export default function CategoryList(props) {

    const CategoryItem = function (props){
        return <option>{props.category.category_name}</option>
    }

  return (<select style={{width:"70%"}} class="form-select" size="10" aria-label="size 3 select example">
    <option selected>(List of your categories)</option>
    {props.categories ? props.categories.map(
        (category)  => <CategoryItem category={category} />
    ) : null}
    </select>
  )
}
//<option value={category._id} key={category.category_name}>{category.category_name}</option>