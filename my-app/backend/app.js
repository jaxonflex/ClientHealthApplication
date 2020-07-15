const express = require('express');

const app= express();

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

app.use('/posts',(req,res,next)=>{
    const users = [
        {   accountID: '123',
            accountName: 'Nintendo',
            contactName: 'Kai Wei',
            email: 'cha@cha.com',
            salesforceURL: 'www.nevergiveup.com',
            licenseStartDate: 'June 21 2019',
            clientHealth: 'Healthy',
            renewalDate: 'Tomorrow',
            daysTillRenewal: '20',
            casesURL: 'www.cases.com',
            lastContactDate:'July 2 2020',
        }
    ];
    res.status(200).json({
        message:'Users successfully fetched',
        users:users,
    });
});

module.exports = app;