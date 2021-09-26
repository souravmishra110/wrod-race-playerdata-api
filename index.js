import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

import { pushData, getData, getTopTen, deleteDataByID } from "./controllers/controllers.js"

const app = express();
const PORT = process.env.PORT || 3000;//remove 3000 when pushing into production

// get config vars
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

try {
    const connectionParams = {
        
    };
    await mongoose.connect(process.env.DB_CONNECTION_KEY, connectionParams);
    console.log("connected to database");
} catch (error) {
    console.log(error);
    console.log("could not connect to database");
}


app.get("/", (req, res) => res.send("Welcome to the Word Game API!"));

app.get("/getdata", getData);
app.post("/pushdata", pushData);
app.get("/gettopten", getTopTen);
app.delete("/deletedatabyid/:id", deleteDataByID);

app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));