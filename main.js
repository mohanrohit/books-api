require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const controllers = require("./controllers");
const authorize = require("./authorize");

const app = express();

const privateRouter = express.Router();
privateRouter.use("/api/v1/books", authorize, controllers.books);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(privateRouter);

app.listen(8080, () => {
    console.log("Server started.");
    console.log(`Database: ${process.env.DATABASE}`);
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`User: ${process.env.DB_USERNAME}`);
});
