"use strict";
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "author",
    {
      author_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
    },
    { paranoid: true, createdAt: false, updatedAt: false }
  );
  Author.associate = function (models) {
    //Author book link
    Author.belongsToMany(models["book"], {
      through: models["author_book"],
      foreignKey: "author_id",
    });
  };
  //
  return Author;
};
