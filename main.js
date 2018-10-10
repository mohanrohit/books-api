require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const models = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/books", async (request, response) => {
    var books = await models.Book.findAll();

    response.send({ books: books });
});

app.get("/books/:id", async (request, response) => {
    var book = await models.Book.findById(parseInt(request.params.id));

    book ? response.send(book) : response.status(404).send("Not found");
});

app.post("/books", async (request, response) => {
    if (!request.body.title)
    {
        response.status(400).send("Title is required.");

        return;
    }

    var newBook = new models.Book(request.body);
    newBook.save();

    response.send(newBook);
});

app.put("/books/:id", async (request, response) => {
    var book = await models.Book.findById(parseInt(request.params.id));
    if (!book)
    {
        response.status(400).send(`No book with id ${request.params.id}`);

        return;
    }

    if (request.body.title)
    {
        book.title = request.body.title;
    }

    await book.save();

    response.send(book);
});

app.listen(8080, () => {
    console.log("Server started.");
});
