const status = require("express-status-monitor");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const databaseConnection = require("./config/database");
// const UserRouter = require("./routes/user.route");

const surveyRouter = require("./routes/survey.route");

const app = express();

dotenv.config();

// const corsOptions = {
//     origin: "http://localhost:5173",
//     credentials: true,
// };

// app.use(cors(corsOptions));

app.use(cors({ origin: "*" }));

app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

// checks invalid json file
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ message: "invalid json file" });
  }
  next();
});

const PORT = 3001;

app.use(status());

app.use("/survey", surveyRouter);

// app.use()

// Route to handle all other invalid requests
app.use((req, res) => {
  return res.status(400).send({ message: "Route doesnt exist" });
});

// databaseConnection(() => {
//   app.listen(PORT, () => {
//     console.log(`server running on ${PORT}`);
//   });
// });
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
