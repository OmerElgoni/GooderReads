"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user_past_book",
    {
      user_past_book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      date_completed: { type: DataTypes.DATE, defaultValue: new Date() },
      date_started: { type: DataTypes.DATE, defaultValue: new Date() },
      rating: DataTypes.BOOLEAN,
      review: DataTypes.STRING,
    },
    { paranoid: true, createdAt: false, updatedAt: false }
  );
};
