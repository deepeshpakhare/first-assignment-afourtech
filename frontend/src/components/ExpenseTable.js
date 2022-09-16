import React from 'react'

export default function ExpenseTable(props) {


    const ColumnOne = function (props) {
        return (
            <tr className='table table-success table-striped'>
                {props.properties.categoryList ? props.properties.categoryList.map((category) => <td>{category.category_name}</td>) :null}
            </tr>
        )
    }

    return (
        <div>
            <table class="table table-success table-striped" style={{ width: 790 }}>
                <tbody>
                    <tr className='table table-success table-striped'>
                        <td>
                            Category Name
                        </td>
                        <td>
                            Expense
                        </td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
    )
}
