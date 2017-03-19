const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define our model
const pollSchema = new Schema({ //lowercase per trasformarlo in lowercase
    name: {type: String},
    options: {type: Array, default: []},
    created_by: {type: String},
    timestamp: {type: Date, default: Date.now}
});

//Create the model class
const ModelClass = mongoose.model('poll',pollSchema);


//Export the model
module.exports = ModelClass;
