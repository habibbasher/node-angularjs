/**
* Importing node modules
*/
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import morgan from 'morgan';


/**
* Importing custom modules for routing
*/
import authentication from './routes/authentication/authentication';
import users from './routes/users/users';

// const mongodbConnector = Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;

/**
* Initializing some const
*/
const app = express();
const PORT = 8080;

/**
* Configuring dotenv. It allows to get constant data from .env file
*/
dotenv.config();

/**
* Using body-parser for parsing data coming from UI
*/
app.use(bodyParser.json());

/**
* Using morgan middleware for log 
*/
app.use(morgan('dev'));

/**
* Connecting MongoDB using mongoose
*/
// mongodbConnector.connectAsync(process.env.MONGODB_URL, { useMongoClient: true })
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true })
.then(() => {
  console.log(`MongoDB connected successfully`);
})
.catch((err) => {
  console.log(`Failed to connect MongoDB ${err}`);
});

// When angular project is build to client directory then use following commented line
// app.use(express.static(path.join(__dirname, 'client')));

/**
* Using custom routes
*/
app.use("/api/authentication", authentication);
app.use("/api/users", users);

/**
* Catching all other routes which is not defined
*/
app.get('/*', (req, res) => {
  // When angular project is build to client directory then use following commented line
  // res.sendFile(path.join(__dirname, 'client/index.html'));
  res.sendFile(path.join(__dirname, './index.html'));
});

/**
* Server listening to specified port
*/
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
