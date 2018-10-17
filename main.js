require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Joi = require("joi");

const models = require("./models");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/books", async (request, response) => {
    var books = await models.Book.findAll();

    response.send({ books: books });
});

app.get("/api/v1/books/:id", async (request, response) => {
    var book = await models.Book.findById(parseInt(request.params.id));

    book ? response.send(book) : response.status(404).send("Not found");
});

const validationSchema = {
    title: Joi.string().required().label("A book title is required")
};

app.post("/api/v1/books", async (request, response) => {
    const result = Joi.validate(request.body, validationSchema);

    if (result.error)
    {
        response.status(400).send({error: { code: 400, message: result.error.details[0].context.label } });

        return;
    }

    var newBook = new models.Book(request.body);
    newBook = await newBook.save();

    response.send(newBook);
});

app.put("/api/v1/books/:id", async (request, response) => {
    var book = await models.Book.findById(parseInt(request.params.id));
    if (!book)
    {
        response.status(400).send(`No book with id ${request.params.id} was found.`);

        return;
    }

    if (request.body.title)
    {
        book.title = request.body.title;
    }

    book = await book.save();

    response.send(book);
});

app.delete("/api/v1/books/:id", async (request, response) => {
    var book = await models.Book.findById(parseInt(request.params.id));
    if (!book)
    {
        response.status(400).send(`No book with id ${request.params.id} was found.`);

        return;
    }

    await book.destroy();

    response.send(book);
});

app.listen(8080, () => {
    console.log("Server started.");
    console.log(`Database: ${process.env.DATABASE}`);
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`User: ${process.env.DB_USERNAME}`);
});
