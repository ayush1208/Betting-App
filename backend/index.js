var express=require('express')
var cors=require('cors')
var mysql=require('mysql');

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"MyBettingDB"
});

db.connect(function(err){
    if(err){
        console.log("DB not connected");
    }
    else{
        console.log("DB connected");
    }
});


app.post("/login",(req,res)=> {
    const {username,password}=req.body
    db.query(
        "SELECT * FROM User WHERE username = ? and password =?",[username,password],
        (err,result)=>{
            if(err){
                res.send({message:"Login failed"})
            }
            if(result.length>0){
                res.send(result);
            }
            else{
                res.send({message:"Wrong Login Details"})
            }
        }
    );

});

app.post("/register",async (req,res)=> {
    const {username,password}=req.body
    db.query(
        "INSERT INTO User(username,password) VALUES (?,?)",[username,password],
        (err,result)=>{
            if(err){
                res.send({message:"Registration Unsuccessful"})
            }
            else{
                res.send({message:"Registration Successful"})
            }
        }
    );
});

app.post("/add",async(req,res) =>{
    const{team1,team2,team1_odds,team2_odds}=req.body
    db.query(
        "INSERT INTO bets(team1,team2,team1_odds,team2_odds) VALUES (?,?,?,?)",[team1,team2,team1_odds,team2_odds],
        (err,result)=>{
            if(err){
                res.send({message:"Bet Not Added"})
            }
            else{
                res.send({message:"Bet Successfully Added"})
            }
        }
    );
});

app.post("/delete",async(req,res) =>{
    const{team1,team2,winner}=req.body
    var mess=""
    db.query(
        "SELECT * FROM (SELECT * FROM bets WHERE team1=? and team2=?) A CROSS JOIN (SELECT * FROM stakes WHERE team1=? and team2=?) B" ,[team1,team2,team1,team2],
        (err,result)=>{
            console.log(result)
            if(err){
                res.send({message:"Deletion failed"})
            }
            else{
                for(let i=0;i<result.length;i++){
                    var username=result[i].username
                    var value=result[i].value
                    var team1_oddss=result[i].team1_odds
                    var team2_oddss=result[i].team2_odds
                    if(winner==result[i].winner){
                        if(winner==team1){
                            value=value*team1_oddss
                        }
                        else{
                            value=value*team2_oddss
                        }
                        mess=mess+username+" won "+value+","
                    }
                    else{
                        if(winner==team1){
                            value=value*team1_oddss
                        }
                        else{
                            value=value*team2_oddss
                        }
                        mess=mess+username+" lost "+value+","
                    }
                }
            }
        }
    );
    
    db.query(
        "DELETE FROM stakes WHERE team1=? and team2=?",[team1,team2],
        (err,result)=>{
            if(err){
                res.send({message:"Deletion failed"})
            }
        }
    );

    db.query(
        "DELETE FROM bets WHERE team1=? and team2=?",[team1,team2],
        (err,result)=>{
            if(err){
                res.send({message:"Deletion failed"})
            }
            else{
                res.send({message:mess})
            }
        }
    );

});

app.post("/place",async(req,res) => {
    const{username,team1,team2,winner,value}=req.body
    console.log(req.body)
    db.query(
        "INSERT INTO stakes(username,team1,team2,winner,value) VALUES(?,?,?,?,?)",[username,team1,team2,winner,value],
        (err,result)=>{
            if(err){
                res.send({message:"Not Placed"})
            }
            else{
                res.send({message: "Successfully Placed"})
            }
        }
    );
});

app.post("/get",async(req,res)=>{
    db.query(
        "SELECT * FROM bets",
        (err,result)=>{
            res.send(result)
        }
    );
});

app.listen(9002,() => {
    console.log("BE started at port 9002")
})
