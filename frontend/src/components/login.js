import React,{useState} from "react";
import axios from "axios"
var username_glob=""
export default function Login(){
    
    const [user,setUser]=useState({
        username: "",
        password: ""
    })
    const handleChange = e => {
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleLogin = e =>{
        const {username,password}=user
        if(username && password){
            axios.post("http://localhost:9002/login",user).then( res => {
                if(res.data.message){
                    alert(res.data.message);
                }
                else{
                    username_glob=user.username
                    alert("Login Successful");
                }
            });
        }
        else{
            alert("Invalid Input")
        }
    }

    return(
        <div className="container text-center my-5">
            <h2 className="my-5">Login</h2>
            <div className="input-group my-4">
                <span className="input-group-text" id="basic-addon1"></span>
                <input type="text" className="form-control" name="username" value={user.username} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange}/>
            </div>

            <div className="col-auto my-4">
                <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                <input type="password" className="form-control" id="inputPassword2" name="password" value={user.password} placeholder="Password" onChange={handleChange}/>
            </div>

            <button className="btn btn-primary text-center" type="submit" onClick={handleLogin}>Login</button>
        </div>
    )
}
export {username_glob}

