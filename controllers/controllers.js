import mongoose from 'mongoose'
import UserModel from '../models/models.js'


export const pushData = async (req, res) => {
    
    const users = await UserModel.find({ username: req.body.username });
    
    try{
        if(users.length === 0){
            console.log("New User Created");


            const users = new UserModel({
                username: req.body.username,
                no_of_games_played: 1,
                score_sum: req.body.curr_score,
                max_level_reached: req.body.curr_level,
                max_score: req.body.curr_score
            });
        
            try{
                await users.save();
                res.send(users);
            }
            catch(error){
                res.status(500).send(error);
            }
            
        }
        else {
            console.log("Already Existing User");
            console.log(users);
            
            
            users[0].no_of_games_played = users[0].no_of_games_played + 1;
            users[0].score_sum = users[0].score_sum + req.body.curr_score;
            if(req.body.curr_level > users[0].max_level_reached){
                users[0].max_level_reached = req.body.curr_level;
            }
            if(req.body.curr_score > users[0].max_score){
                users[0].max_score = req.body.curr_score;
            }
            
            console.log(users);

            try{
                await UserModel.findByIdAndUpdate((users[0]._id), users[0])
                res.send(users[0])
            }
            catch(error){
                res.status(500).send(error)
            }

            // res.send(users)
        }
    }
    catch(error){
        res.status(500).send(error);
    }

}

export const getData = async (req, res) => {
    const users = await UserModel.find({});

    try{
        res.send(users);
    }
    catch(error){
        res.status(500).send(error);
    }
}

export const getTopTen = async (req, res) => {
    const users = await UserModel.find({}).sort({max_score:-1}).limit(10);
    
    try{
        res.send(users);
    }
    catch(error){
        res.status(500).send(error);
    }
}

export const deleteDataByID = async (req, res) => {
    try{
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if(!user)   res.status(404).send("No item found");

        res.ststus(200).send("Removed Successfully");
    }
    catch(error) {
        res.status(500).send(error)
    }
}