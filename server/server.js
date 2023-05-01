const express = require("express");
const app = express();
const PORT = 8000;

// allows us to use .env to pull data out
require('dotenv').config();

// allow us to send cookie - HTTP cookies are a way that we can send information between the server and the client
const cookieParser = require('cookie-parser')

// const SECRET=process.env.SECRET_KEY;

const cors = require("cors")

// require configuration file
require("./config/mongoose.config");

//Middleware for formating and allowing POST requests
app.use(express.json(), express.urlencoded({ extended: true }));
// middleware for cookie parser
app.use(cookieParser());

//Middleware for sending data back and forth to client side
app.use(cors({credentials:true, origin:'http://localhost:3000'}))

//import routes- to send and read each request and response
require("./routes/movie.routes")(app); //movie routes
require("./routes/user.routes")(app); // user routes

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
