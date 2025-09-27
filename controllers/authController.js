const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try {
        // get the user details from the request body
        const { name, email, password } = req.body;

        // check if the user already exists
        const existingUser = await User.find({ email });

        // if the user already exists, return an error
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user object
        const newUser = new User({ name, email, password: hashedPassword });

        // save the user to the database
        const savedUser = await newUser.save();

        // check if the user was saved successfully
        if (!savedUser) {
            return res.status(500).json({ message: 'Failed to register user' });
        }

        // return a success response
        return res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    register,
}