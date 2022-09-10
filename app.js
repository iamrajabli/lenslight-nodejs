import express from 'express';
import dotenv from 'dotenv'
import conn from './db.js';
import router from './routes/pageRouter.js';

// dotenv
dotenv.config();

// connection to db
conn();

// create app and port
const app = express();
const port = 3000;

// ejs template engine
app.set('view engine', 'ejs');

// static file middleware
app.use(express.static('public'));

// get methods
app.use(router)

// listening server
app.listen(port, () => {
    console.log("Server created in " + port + " port");
})