const mongoose = require('mongoose');
const { stringify } = require('querystring');

const accountDisplaySchema = mongoose.Schema({
    accountID: {type:String, required:true},
    note: {type:String},
    date:{type:String},

})

module.exports = mongoose.model('MongooseAccountDisplay',accountDisplaySchema);