"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "wishlist",
    {
      wishlist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      date_added: DataTypes.DATE,
      priority: DataTypes.INTEGER,
    },
    { paranoid: true, createdAt: false, updatedAt: false }
  );
};
