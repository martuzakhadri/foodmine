import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { FoodModel } from "../models/food.model";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';
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
 

  router.post('/register', asyncHandler(
    async (req, res) => {
      const {name, email, password, address} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        const HTTP_BAD_REQUEST=400;
        res.status(HTTP_BAD_REQUEST)
        .send('User is already exist, please login!');
        return;
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const newUser:User = {
        id: '',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
  
        isAdmin: false,
        token: ''
      }
  
      const dbUser = await UserModel.create(newUser);
      res.send(generatetokenResponse(dbUser));
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