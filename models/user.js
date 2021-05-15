"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      email_address: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
    },
    { paranoid: true, createdAt: false, updatedAt: false }
  );
  User.associate = function (models) {
    //User past book link
    User.belongsToMany(models["book"], {
      through: models["user_past_book"],
      foreignKey: "user_id",
    });

    //User wishlist link
    User.belongsToMany(models["book"], {
      through: models["wishlist"],
      foreignKey: "user_id",
      as: "wishlist_owner",
    });
  };
  //
  return User;
};
