const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const items = require("./route/item_route");
const app = express();

const PORT = 5000;
app.use(cors());

mongoose
    .connect(`mongodb://localhost:27017/calvin_klein`)
    .then((res) => {
        console.log("db is connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.use("/api/items", items);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
