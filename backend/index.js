require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

connection();

app.use(express.json());
app.use(cors());
//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
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
