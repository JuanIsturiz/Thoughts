import express from "express";
const app = express();
const { PORT } = require("./config");
const cors = require("cors");
import connectDB from "./db";
const { errorHandler } = require("./middlewares/errorMiddelware");

// basic express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// user routes
app.use("/user", require("./routes/userRouter"));

// thoughts routes
app.use("/thoughts", require("./routes/thoughtRouter"));

// error middleware
app.use(errorHandler);

// db connection and server start
connectDB()
  .then((_) => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
