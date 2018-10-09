require("dotenv").config();

const models = require("./models");

const Book = models.Book;

var newBook = new Book({title: "Harry Potter and the Goblet of Fire"});
newBook.save();
