//Main starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const index = require('./routes/index');
const polls = require('./routes/polls');

const cors = require('cors');
require('dotenv').config();

//DB setup
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/voting');
mongoose.connect(process.env.DB_URI, function(err, res){
    if(err){
        console.log('DB CONNECTION FAILED '+err);
    }
    else{
        console.log('DB CONNECTION SUCCESS');
    }
});


//App setup
//Questi sono middleware
app.use(morgan('combined'));
app.use(cors());    //CORS problem
app.use(bodyParser.json({ type: '*/*' }));
//router_index(app);
app.use('/', index);
app.use('/poll', polls);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);  //lavora con le richieste http
server.listen(port);
console.log('Server listening on port', port);
