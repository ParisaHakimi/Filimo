const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/filimodb", {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("established a connection to the database"))
  .catch((err) =>
    console.log("something went wrong when connecting to db", err)
  );
