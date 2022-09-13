import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Username area is required'],
        validator: [validator.isAlphanumeric, 'Valid username is required']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: [true, 'Email area is required'],
        validator: [validator.isEmail, 'Valid email is required']
    },
    password: {
        type: String,
        required: [true, 'Password area is required'],
        minLength: [4, 'At least 4 characters'],
    }
},
    {
        timestamps: true
    }
)

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

const User = model('User', userSchema);

export default User;