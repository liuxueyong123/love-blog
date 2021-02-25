const { Model, DataTypes } = require("sequelize");
const db = require("./db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    account: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "user",
    tableName: "user",
    timestamps: false,
    sequelize: db.loveBlog,
  }
);

module.exports = User;
