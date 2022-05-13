import axios from "axios";
import React,{useState} from "react";
import {username_glob} from './login'; 
export default function Home(){

    const [newBet,setNewBet]=useState({
        team1:"",
        team2:"",
        team1_odds:"",
        team2_odds:""
    })
    
    const [addBet,setAddBet]=useState({
        username:"",
        team1:"Delhi Capitals",
        team2:"Mumbai Indians",
        winner:"",
        value:""
    })

    const [removeBet,setRemoveBet]=useState({
        team1:"Delhi Capitals",
        team2:"Mumbai Indians",
        winner:""
    })


    const handleChange3 = e => {
        const{name,value} = e.target
        setNewBet({
            ...newBet,
            [name]:value
        })
    }

    const handleAddBet = e =>{
        const{team1,team2,team1_odds,team2_odds}=newBet
        if(team1 && team2 && team1_odds && team2_odds){
            axios.post("http://localhost:9002/add",newBet).then(res=> {
                alert(res.data.message);
            });
        }
        else{
            alert('Invalid Input');
        }
    }

    const handleChange2 = e =>{
        const{name,value} = e.target
        setRemoveBet({
            ...removeBet,
            [name]:value
        })
    }

    const handleRemoveBet = e =>{
        const{team1,team2,winner}=removeBet
        if(team1 && team2 && winner){
            axios.post("http://localhost:9002/delete",removeBet).then(res=> {
                alert(res.data.message);
            });
        }
        else{
            alert('Invalid Input');
        }
    }

    const handleChange1 = e =>{
        const{name,value} = e.target
        setAddBet({
            ...addBet,
            [name]:value
        })
    }

    const handlePlaceBet = e =>{
        addBet.username=username_glob
        const{username,team1,team2,winner,value}=addBet
        console.log(addBet)
        if(username && team1 && team2 && winner && value){
            axios.post("http://localhost:9002/place",addBet).then(res=> {
                alert(res.data.message);
            });
        }
        else{
            alert('Invalid Input')
        }
    }

    return(
        <div className="container text-center">
            <h2 className="my-4">Active Bets</h2>

            <div className="accordion" id="accordionExample1">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" >
                            Delhi Capitals vs Mumbai Indians
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <h4>Odds to win - 1.8 vs 2.0</h4>
                            <h4>Place a Bet</h4>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Pick your Team" aria-label="Pick your Team" name="winner" value={addBet.winner} onChange={handleChange1}/>
                                <span className="input-group-text"></span>
                                <input type="text" className="form-control" placeholder="Add your stakes" aria-label="Add your stakes" name="value" value={addBet.value} onChange={handleChange1}/>
                                <button className="btn btn-primary" type="submit" onClick={handlePlaceBet}>Place Bet</button>
                            </div>
                            <h4>End the Bet</h4>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"></span>
                                <input type="text" className="form-control" placeholder="Enter the Winner" aria-label="Enter the Winner" aria-describedby="basic-addon1" name="winner" value={removeBet.winner} onChange={handleChange2}/>
                                <button className="btn btn-primary" type="submit" onClick={handleRemoveBet} >End Bet</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>





            <h2 className="my-4">Add a new bet</h2>
            <div className="input-group">
                <span className="input-group-text">First and Second Team Name</span>
                <input type="text" aria-label="First Team name" className="form-control" name="team1" value={newBet.team1} onChange={handleChange3}/>
                <input type="text" aria-label="Second Team name" className="form-control" name="team2" value={newBet.team2} onChange={handleChange3}/>
            </div>
            <div className="input-group my-3">
                <span className="input-group-text">First and Second Odds</span>
                <input type="text" aria-label="First Team Odd" className="form-control" name="team1_odds" value={newBet.team1_odds} onChange={handleChange3}/>
                <input type="text" aria-label="Second Team Odd" className="form-control" name="team2_odds" value={newBet.team2_odds} onChange={handleChange3}/>
            </div>
            <button className="btn btn-primary text-center" type="submit" onClick={handleAddBet} >Add New Bet</button>
        </div>


    )
}