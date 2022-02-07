const express = require("express")
const app = express()
const {getReleaseBody} = require('./utils')

app.get("/",async (req,res)=>{

    try {
        console.log("tag",process.env.github_tag)
        if(process.env.github_tag){
            const data = await getReleaseBody(process.env.github_tag)
            console.log("data",data)
            res.status(400).json(data);
        }else{
            res.status(400).json({
                status:"Tag not found"
            });
        } 
    } catch (error) {
        res.status(404).json(error);
    }


})

app,get("/release",async (req,res)=>{
    console.log("added user")
    res.status(400).json({
        status:"working"
    });
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
