const express = require('express');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const app = express();
app.use(express.json());
app.use("/api/v1",userRouter);
app.use("/api/v1/auth",authRouter);
module.exports = app;