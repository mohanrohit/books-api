const models = require("./models");

const Book = models.Book;

var newBook = new Book({title: "Harry Potter"});
newBook.save();
