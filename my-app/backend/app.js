const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const MongooseUserList = require('./models/user-list');
const userList = require('./models/user-list');

const MongooseAccountDisplay = require('./models/account-display')

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
    console.log("Post called");
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

app.post('/account',(req, res, next) => {
    
    
    
    const note = new MongooseAccountDisplay({
        accountID: req.body.accountID,
        note: req.body.note,
        date:req.body.date,
    })
    note.save();
    res.status(201).json({
        message:"success"
    });
});

app.get('/users',(req,res,next)=>{
    MongooseUserList.find()
        .then(documents => {
            res.status(200).json({
                message:'Users successfully fetcheds',
                users:documents,
            });
        });

});

app.get('/account/:id',(req,res,next)=>{
    
    MongooseAccountDisplay.find({accountID:req.params.id})
        .then(documents => {
            console.log(documents.accountID)
            res.status(200).json({
                message:"Notes successfully fetched",
                notes:documents,
            })
        })

})

app.delete('/users/:id', (req,res,next) =>{
    
    res.status(200).json({message:"Post Deleted"});
});

app.put("/users/:id", (req,res,next) => {
    
    const newUser = new userList({
        _id :req.body._id,
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
        lastContactDate: req.body.lastContactDate,
        licenseType:req.body.licenseType,
        payment:req.body.payment,
        QBR:req.body.QBR,
        useCase:req.body.useCase,

    })
    const newTask=req.body.outstandingTasks;
    
    if(newTask == null){
        
        userList.updateOne({_id:req.body._id}, newUser).then(result=> {
            res.status(200).json({message:"Update successful",result});
        }) 

    }
    else{
        console.log(req.body._id);
        userList.update({_id:req.body._id},{$push:{oustandingTasks:newTask}}).then(result=>{
            res.status(200).json({message:"New task added",result});
        })
        
    };
    

    
});
module.exports = app;