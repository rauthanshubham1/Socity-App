const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })
require("./db/connect");
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(require("./router/routes"));

app.listen(PORT, () => {
    console.log("Running on port ", PORT);
})