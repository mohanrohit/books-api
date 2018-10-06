'use strict';

module.exports = (sequelize, DataTypes) => {
  const bookSchema = {
    title: DataTypes.STRING
  };

  const Book = sequelize.define('Book', bookSchema, { tableName: "books" });

  Book.associate = function(models) {
    // associations can be defined here
  };

  return Book;
};
