const User = require('../models/User');
const bcrypt = require('bcrypt');

//have to create a new controller method for sign up with google
//code for sign up with google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
    googleSignUp: async (req, res) => {
        try {
            const { tokenId } = req.body;
            const response = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const { email_verified, email, name } = response.payload;
            if (!email_verified) {
                return res.status(400).json({ msg: 'Email not verified' });
            }
            const user = await User.findOne({email});
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
            const newUser = new User({
                name,
                email
            });
            await newUser.save();
            res.status(201).json({ msg: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};



module.exports = authController;