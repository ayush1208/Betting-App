import React,{useState} from "react";

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

            <button className="btn btn-primary text-center" type="submit">Login</button>
        </div>
    )
}
