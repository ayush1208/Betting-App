import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://127.0.0.1/myBettingDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=> {
    console.log("DB connected")
})

const userSchema=new mongoose.Schema({
    username:String,
    password:String
});

const User=new mongoose.model("User",userSchema)


app.post("/login",(req,res)=> {
    res.send("My Login API")
})

app.post("/register",(req,res)=> {
    const {username,password}=req.body
    User.findOne({username:username},(err,userr) => {
        if(userr){
            res.send({message: "A person with this username already exists"})
        }
        else{
            const user = new User({
                username:username,
                password:password
            })
            user.save(function(err,result){
                if(err){
                    res.send({message:"Registration Unsuccessful"})
                }
                else{
                    res.send({message:"Registration Successful"})
                }
            })
        }
    })
})


app.listen(9002,() => {
    console.log("BE started at port 9002")
})
