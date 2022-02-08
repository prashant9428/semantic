const express = require("express")
const app = express()
const {getReleaseBody} = require('./utils')

app.get("/",async (req,res)=>{
    res.status(200).json({
        status:"working"
    });
})


app.get("/release",async (req,res)=>{

    try {
        console.log("tag",process.env.github_tag)
        if(process.env.github_tag){
            const data = await getReleaseBody(process.env.github_tag)
            let body = data.body
            const searchRegExp = /\(.*\)/g;
            body = body.replace(searchRegExp,"")
            body = body.replace(/\n/g,' ');
            let splitCommit = body.split('*')
            res.status(200).json({"commits":splitCommit});
        }else{
            res.status(400).json({
                status:"Tag not found"
            });
        } 
    } catch (error) {
        res.status(404).json(error);
    }


})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
