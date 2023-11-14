import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors"

const app = express();
app.use(express.json());
import foodsRouter from "./routers/foods.router";
import userRouter from "./routers/users.router";
import { dbconnect } from './configs/databaseconnection';
dbconnect();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
    
}));


app.use('/api/foods',foodsRouter);
app.use("/api/users",userRouter);



const port =5000;
app.listen(port, ()=>{
    console.log("serving on port  http://localhost:" + port);
})
