const mongoose = require('mongoose');

const accountDisplaySchema = mongoose.Schema({
    accountID: {type:String, required:true},
    accountNotes: [{
        commentID: Number,
        comment:String,
        date:String,
    }]

})

module.exports = mongoose.model('MongooseAccountDisplay',accountDisplaySchema);