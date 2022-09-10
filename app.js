import express from 'express';
import dotenv from 'dotenv'
import conn from './db.js';

dotenv.config();

// connection to db
conn();

const app = express();
const port = 3000;

// ejs template engine
app.set('view engine', 'ejs');

// static file middleware
app.use(express.static('public'));

// get methods
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})




app.listen(port, () => {
    console.log("Server created in " + port + " port");
})