const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const candidateRoutes =
require("./routes/candidateRoutes");

const matchRoutes =
require("./routes/matchRoutes");

const aiRoutes =
require("./routes/aiRoutes");

const app = express();


// Middlewares

app.use(cors());

app.use(express.json());


// Routes

app.use(
  "/api/candidates",
  candidateRoutes
);

app.use(
  "/api/match",
  matchRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);


// MongoDB Connection

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((error) => {

  console.log(error);

});


// Test Route

app.get("/", (req, res) => {

  res.send(
    "ATS Backend Running"
  );

});


// Server

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});