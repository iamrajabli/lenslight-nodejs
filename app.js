import express from 'express';
import dotenv from 'dotenv'
import conn from './db.js';
import pageRouter from './routes/pageRouter.js';
import photoRouter from './routes/photoRouter.js';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import { checkUser } from './middlewares/authMiddleware.js';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';

// dotenv
dotenv.config();

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
})

// connection to db
conn();

// create app and port
const app = express();
const port = 3001;

// ejs template engine
app.set('view engine', 'ejs');

// static file middleware
app.use(express.static('public'));

// json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }))

// methods 
app.use(checkUser)
app.use(pageRouter)
app.use(photoRouter)
app.use(userRouter)

// listening server
app.listen(port, () => {
    console.log("Server created in " + port + " port");
})