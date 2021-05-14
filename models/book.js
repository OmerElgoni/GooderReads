"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "book",
    {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      cover_art: DataTypes.STRING,
      isbn: DataTypes.STRING,
      negative_rating: DataTypes.INTEGER,
      positive_rating: DataTypes.INTEGER,
      publisher: DataTypes.STRING,
      release_date: DataTypes.DATE,
      title: DataTypes.STRING,
    },
    { paranoid: true }
  );
  Book.associate = function (models) {
    //User book past book link
    Book.belongsToMany(models["user"], {
      through: models["user_past_book"],
      foreignKey: "book_id",
    });

    //User wishlist link
    Book.belongsToMany(models["user"], {
      through: models["wishlist"],
      foreignKey: "book_id",
    });
  };
  return Book;
};
