const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: [, 'Login is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        favouriteDrinks: {
            type: [String],
            required: false,
            default: []
        },
        favouriteIngredients: {
            type: [String],
            required: false,
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;