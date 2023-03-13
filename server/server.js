const express = require("express");
const app = express();
const mongoose = require("mongoose");
// prevent server breach by harmful injection
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes")
require('dotenv').config()
const httpStatus = require('http-status')
const passport = require('passport')
const { handleError, convertToApiError } = require('./middleware/apiError')
const { jwtStrategy } = require('./middleware/passport')

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri)

app.use(express.json());

// sanitize
app.use(xss());
app.use(mongoSanitize());

// passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// localhost: 3001/api
app.use('/api', routes);

//middleware to handle errors
app.use(convertToApiError)
app.use((err, req, res, next) => {
    handleError(err, res)
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});