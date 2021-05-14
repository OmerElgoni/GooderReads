"use strict";
module.exports = (sequelize, DataTypes) => {
  const AuthorBook = sequelize.define(
    "author_book",
    {
      author_book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
    },
    { paranoid: true }
  );
  return AuthorBook;
};
