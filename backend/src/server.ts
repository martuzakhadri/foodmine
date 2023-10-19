import express from "express";
import cors from "cors"
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken"
const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
    
}));


app.get("/api/foods",(req,res)=>{
    res.send(sample_foods)
})

app.get("/api/foods/search/:srearchTerm",(req,res)=>{
    const srearchTerm = req.params.srearchTerm;
    const foods= sample_foods.filter(food=> food.name.toLowerCase()
    .includes(srearchTerm.toLocaleLowerCase()));
    res.send(foods);
})
app.get("/api/foods/tag/:tagname",(req,res)=>{
    const tagname = req.params.tagname;
    const foods = sample_foods.filter(food=>food.tags?.includes(tagname))
    res.send(foods);
})

app.get("/api/foods/tags",(req,res)=>{
    res.send(sample_tags)
})

app.get("/api/foods/:FoodId",(req,res)=>{
    const FoodId= req.params.FoodId;
    const food =  sample_foods.find(food => food.id === FoodId);
    res.send(food)

})

app.post("/api/users/login",(req,res)=>{
   const {email,password} = req.body;
    const user = sample_users.find(user=>
        user.email === email && user.password === password)
        if(user){
            res.send(generatetokenResponse(user))
        }
        else{
            res.status(400).send("username is not valid");
        }
})

const generatetokenResponse = (user:any)=>{
const token = jwt.sign({
    email:user.email,isAdmin:user.isAdmin
},"itsPrivatekey",{
    expiresIn:"1h"
});
user.token = token;
return user;
}

const port =5000;
app.listen(port, ()=>{
    console.log("serving on port  http://localhost:" + port);
})
