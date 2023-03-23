import { useState } from "react";
import UserContext from "./UserContext";


const UserState= (props)=>{
    const [user,setuser]=useState("null")
    const removeUser=()=>{
        setuser(null)
    }
    const getUser=async ()=>{
        const response = await fetch(`http://localhost:5000/auth/getuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = response.json();
        setuser(json);
    }

      const login= async ({email,password})=>{
        //api call
        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        return response.json();
      }

      //Add Notes
      const signup= async ({name,email,password})=>{
        //api call
        const response = await fetch(`http://localhost:5000/auth/create`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
        })
        return response.json();
    }
      //delete Notes
      
      // Edit notes
      

    return(
        <UserContext.Provider value={{user:user,removeUser,login,signup,getUser}} >
            {props.children}
        </UserContext.Provider>
    )

}

export default UserState;