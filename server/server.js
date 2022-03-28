const express = require("express");
require('dotenv').config({path: "./config.env"})
const app = express();
const connectDB = require("./configuration/db");
const errorHandler = require("./middleware/error");

connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api running");
});
// app.post('/api/auth/upload', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })
// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});