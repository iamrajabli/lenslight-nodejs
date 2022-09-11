import express from 'express';
import dotenv from 'dotenv'
import conn from './db.js';
import pageRouter from './routes/pageRouter.js';
import photoRouter from './routes/photoRouter.js';
import userRouter from './routes/userRouter.js'

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

// json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// methods
app.use(pageRouter)
app.use(photoRouter)
app.use(userRouter)

// listening server
app.listen(port, () => {
    console.log("Server created in " + port + " port");
})