import React from 'react'
import {useForm} from "react-hook-form"


export default function Form() {
    const {register,handleSubmit} = useForm()
    const onSubmit = async (data) => console.log(data)

  return (
    <section>
        <div className='register'>
            <div className='col-1'>
                <h1><u>Expense Manager</u></h1>
               <h2>Register</h2>
               <span>
                    Register to enjoy the service
               </span>
               <form method= "POST" id="form" className='flex flex-col'  onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("username")} placeholder='username'/>
                    <input type="text" {...register("password")} placeholder='password'/>
                    <input type="text" {...register("confirmpwd")} placeholder='confirm password'/>
                    <button className='btn'>Register</button>
               </form>
                Already registered?   <button className='login'>Login</button>
            </div>
        </div>
    </section>
  )
}