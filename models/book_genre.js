"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookGenre = sequelize.define(
    "book_genre",
    {
      book_genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
    },
    { paranoid: true }
  );
  return BookGenre;
};
