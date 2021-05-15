"use strict";
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "genre",
    {
      genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      genre: DataTypes.STRING,
    },
    { paranoid: true, createdAt: false, updatedAt: false }
  );
  Genre.associate = function (models) {
    //Genre book link
    Genre.belongsToMany(models["book"], {
      through: models["book_genre"],
      foreignKey: "genre_id",
    });
  };
  //
  return Genre;
};
