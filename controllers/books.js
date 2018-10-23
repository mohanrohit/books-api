const express = require("express");
const Joi = require("joi");

const models = require("../models");
//const authorize = require("../authorize");

const router = express.Router();

router.get("/", async (request, response) => {
    var books = await models.Book.findAll();

    response.send({ books: books });
});

router.get("/:id", async (request, response) => {
    var book = await models.Book.findById(parseInt(request.params.id));

    book ? response.send(book) : response.status(404).send("Not found");
});

const validationSchema = {
    title: Joi.string().required().label("A book title is required")
};

//router.post("/", authorize, async (request, response) => {
router.post("/", async (request, response) => {
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

router.put("/:id", async (request, response) => {
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

router.delete("/:id", async (request, response) => {
    var book = await models.Book.findById(parseInt(request.params.id));
    if (!book)
    {
        response.status(400).send(`No book with id ${request.params.id} was found.`);

        return;
    }

    await book.destroy();

    response.send(book);
});

module.exports = router;
