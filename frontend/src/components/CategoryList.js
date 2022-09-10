import React from 'react'

export default function CategoryList(props) {

    const CategoryItem = function (props){
        return <li>{props.category.category_name}</li>
    }

  return (<ol>
    {props.categories ? props.categories.map(
        (category)  => <CategoryItem category={category} />
    ) : null}
    </ol>
  )
}
//<option value={category._id} key={category.category_name}>{category.category_name}</option>