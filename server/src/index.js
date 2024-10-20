const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./route/v1");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
app.use(cors());

// mongoose
//     .connect(`mongodb://localhost:27017/calvin_klein`)
//     .then((res) => {
//         console.log("db is connected");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => {
        console.log("db is connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.use("/v1", router);

// app.listen(PORT, () => {
//     console.log(`Server is running at ${PORT}`);
// });

module.exports = app;
