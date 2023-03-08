const express = require("express");
const app = express();
const { PORT } = require("./config");
const cors = require("cors");
const connectDB = require("./dbConfig");
const { errorHandler } = require("./middleware/error");

// basic express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// user routes
app.use("/user", require("./routes/userRouter"));

// thoughts routes
app.use("/thought", require("./routes/thoughtRouter"));

// error middleware
app.use(errorHandler);

// db connection and server start
connectDB()
  .then((_) => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
