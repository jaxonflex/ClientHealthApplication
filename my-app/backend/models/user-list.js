const mongoose = require('mongoose');

const userListSchema = mongoose.Schema({
    accountID: {type:String, required:true},
    accountName: {type:String, default: 'empty'},
    contactName: {type:String, default: 'empty'},
    email:{type:String, default: 'empty'},
    salesforceURL: {type:String, default: 'empty'},
    licenseStartDate: {type:String, default: 'empty'},
    clientHealth: {type:String, default: 'empty'},
    renewalDate: {type:String, default: 'empty'},
    daysTillRenewal: {type:String},
    casesURL: {type:String},
    lastContactDate:{type:String},
    licenseType:{type:String},
    payment:{type:String},
});

module.exports = mongoose.model('MongooseUserList',userListSchema);