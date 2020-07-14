const express = require('express');

const app= express();

app.use((req,res,next)=>{
    console.log("work");
    res.send("hi");
});

module.exports = app;