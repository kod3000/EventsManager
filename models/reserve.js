const mongoose = require("mongoose");

//get access to Schema constructor
const Schema = mongoose.Schema;

//create a new schema for our app
const schema = new Schema({
    eventNum: {
        type: Number,
        default: 0,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    reservationName: {
        type: String,
        required: true
    },
    numberInParty: {
        type: String,
        required: true
    },
    numberOfVegans: {
        type: String,
        required: true
    },
    // note .. future waiting list purposes
    status: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

schema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    } else {
        this.updatedAt = new Date();
    }
    next();
});

schema.pre('update', function(next){
           this.updatedAt = new Date();
        next();
           });

// export the model with associated name and schema
module.exports = mongoose.model("Reserve", schema);
