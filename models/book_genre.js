"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "book_genre",
    {
      book_genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
    },
    { paranoid: true, createdAt: false, updatedAt: false }
  );
};
