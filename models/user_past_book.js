"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPastBook = sequelize.define(
    "user_past_book",
    {
      user_past_book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      date_completed: DataTypes.DATE,
      date_started: DataTypes.DATE,
      rating: DataTypes.BOOLEAN,
      review: DataTypes.STRING,
    },
    { paranoid: true }
  );
  return UserPastBook;
};
