const mongoose = require("mongoose");

//get access to Schema constructor
const Schema = mongoose.Schema;

//create a new schema for our app
const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    mainImage: {
        title: String,
        originalFileName: String,
        mimetype: String,
        imageurl: String,
        size: String,
        description: String,
        createdAt: Date,
    },
    supportImages: [{
        title: String,
        originalFileName: String,
        mimetype: String,
        imageurl: String,
        size: String,
        description: String,
        createdAt: Date,
    }],
    seatCapacity: {
        type: String,
        required: true
    },
    seatsOccupied: {
        type: String,
        default: 0,
        required: false
    },
    seatsVegatarian: {
        type: String,
        default: 0,
        required: false
    },
    servingPlates: [{
        title: String,
        description: String,
        cost: String,
        sale: String
    }],
    eventDate: {
        type: Date,
        required: false
    },
    eventType: {
        type: String,
        required: false
    },
    lifeType: {
        type: String,
        required: false
        // present future past
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    hidden: Boolean,
    eventNum: {
        type: Number,
        default: 0
    }

});

schema.pre('save', function (next) {

    const checkModel = mongoose.model("Event", schema);
    var incomingDoc = this;

    // we want to give a count to the events
    checkModel.countDocuments().then(count => {

        if (!incomingDoc.createdAt) {
            incomingDoc.createdAt = new Date();
            incomingDoc.eventNum = count + 1; // Increment count (we dont want zero's)
        } else {
            incomingDoc.updatedAt = new Date();
        }
        if(!incomingDoc.eventType){
            // checks if the event type was made as private event.
            incomingDoc.eventType = "Public";
        }

        // check if no image is set, setup a image for event.
        if (incomingDoc.mainImage.title == null) {
            incomingDoc.mainImage = {
                title: "Default",
                originalFileName: "event.png",
                mimetype: "image/png",
                imageurl: "/static/img/event.png",
                size: "6",
                description: "Default Image",
                createdAt: new Date(),
            };
        }
        next();
    });
});

schema.pre('findOne', function (next) {

    // make sure the db is populated..
    const checkModel = mongoose.model("Event", schema);

    checkModel.countDocuments().then((count) => {
        if (count === 0) {
            var tempModel = new checkModel({
                title: "First Event",
                seatCapacity: "100",
                lifeType: "present",
                hidden: false,
                mainImage: {
                    title: "First Default",
                    originalFileName: "event.png",
                    mimetype: "image/png",
                    imageurl: "/static/img/event.png",
                    size: "6",
                    description: "Default Image",
                    createdAt: new Date(),
                }
            });
            tempModel.save();
        }
    });
    next();
});

schema.pre('find', function (next) {

    // make sure the db is populated..
    const checkModel = mongoose.model("Event", schema);

    checkModel.countDocuments().then((count) => {
        if (count === 0) {
            var tempModel = new checkModel({
                title: "First Event",
                seatCapacity: "100",
                lifeType: "present",
                hidden: false,
                mainImage: {
                    title: "First Default",
                    originalFileName: "event.png",
                    mimetype: "image/png",
                    imageurl: "/static/img/event.png",
                    size: "6",
                    description: "Default Image",
                    createdAt: new Date(),
                }
            });
            tempModel.save();
        }
    });
    next();
});
// export the model with associated name and schema
module.exports = mongoose.model("Event", schema);
