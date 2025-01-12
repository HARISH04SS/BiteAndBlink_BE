const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../utils/config');

// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const authController = {
    register: async (req, res) => {
        try {
            const {name, email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({name, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ msg: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'User not found' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
            //generate token
            const token = jwt.sign({ id: user._id },jwt_secret);
            res.cookie('token', token, { httpOnly: true, sameSite: 'none' });

            res.status(200).json({ msg: 'User logged in successfully' });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};



module.exports = authController;