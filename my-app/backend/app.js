const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const MongooseUserList = require('./models/user-list');

const app= express();

mongoose.connect('mongodb+srv://jaxonflex:JnjGdA5baJYA6J93@cluster0.wkql7.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(()=>{
    console.log('Connected to data base')
    })
    .catch(()=>{
        console.log('connection to database failed');
    });
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,PUT,OPTIONS"
        );
    next();
});



app.post('/users', (req,res,next) =>{
    const user = new MongooseUserList({
        accountID: req.body.accountID,
        accountName: req.body.accountName,
        contactName: req.body.contactName,
        email:req.body.email,
        salesforceURL:req.body.salesforceURL,
        licenseStartDate: req.body.licenseStartDate,
        clientHealth: req.body.clientHealth,
        renewalDate: req.body.renewalDate,
        daysTillRenewal: req.body.daysTillRenewal,
        casesURL: req.body.casesURL,
        lastContactDate: req.body.lastContactDate

    });
    user.save();//mongoose function for variables of type Mongoose stuff
    
    res.status(201).json({
        message:'Post Added well'
    });
});

app.get('/users',(req,res,next)=>{
    MongooseUserList.find()
        .then(documents => {
            res.status(200).json({
                message:'Users successfully fetched',
                users:documents,
            });
        });

});

app.get('/account/:id',(req,res,next)=>{
    res.status(200).json({
        message:"Good job",
        id:req.params.id,

    })
})

app.delete('/users/:id', (req,res,next) =>{
    console.log(req.params.id);
    res.status(200).json({message:"Post Deleted"});
});

module.exports = app;