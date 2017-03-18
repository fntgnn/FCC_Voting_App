//Main starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

const cors = require('cors');

//DB setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voting');


//App setup
//Questi sono middleware
app.use(morgan('combined'));
app.use(cors());    //CORS problem
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);  //lavora con le richieste http
server.listen(port);
console.log('Server listening on port', port);
