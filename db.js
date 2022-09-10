import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: 'lenslight_az',
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to Database Atlas'))
        .catch((err) => console.log('Connection failed: ' + err))
}


export default conn;