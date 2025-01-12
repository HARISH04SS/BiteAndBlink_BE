require('dotenv').config();
const mongodb_URL =  process.env.mongodb_URL;
const jwt_secret = process.env.jwt_secret;

module.exports={
    mongodb_URL,
    jwt_secret
}