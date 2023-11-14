import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { FoodModel } from "../models/food.model";
import asyncHandler from 'express-async-handler';
import { UserModel } from "../models/user.model";
const router = Router();


router.get("/seed", asyncHandler(
    async (req, res) => {
       const userscount = await UserModel.countDocuments();
       if(userscount> 0){
         res.send("Seed is already done!");
         return;
       }
   
       await UserModel.create(sample_users);
       res.send("Seed Is Done!");
   }
   ))


   router.post("/login", asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email , password});
        
       if(user) {
        res.send(generatetokenResponse(user));
       }
       else{
        const HTTP_BAD_REQUEST=400;
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
    
    }
  ))
 
 const generatetokenResponse = (user:any)=>{
 const token = jwt.sign({
     email:user.email,isAdmin:user.isAdmin
 },"itsPrivatekey",{
     expiresIn:"1h"
 });
 user.token = token;
 return user;
 }

 export default router;