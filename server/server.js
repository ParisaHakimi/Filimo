const express = require("express");
const app = express();
const PORT = 8000;
const cors=require("cors")
// require configuration file
require("./config/mongoose.config");

//Middleware for formating and allowing POST requests
app.use(express.json(), express.urlencoded({ extended: true }));

//Middleware for sending data back and forth to client side
app.use(cors({origin:'http://localhost:3000'}))

//import routes
const Routes = require("./routes/movie.routes");
Routes(app);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
