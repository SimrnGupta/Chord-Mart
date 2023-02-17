const express = require("express");
const app = express();
const mongoose = require("mongoose");

// prevent server breach by harmful injection
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

app.use(xss());
app.use(mongoSanitize());


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});