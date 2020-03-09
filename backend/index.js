const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// import routes
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.ATLAS_DB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connection established successfully");
});

mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

app.use(cors());
app.use(express.json());

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
