const { Model, DataTypes } = require("sequelize");
const db = require("./db");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    publisher_id: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    publish_time: {
      type: DataTypes.STRING,
    },
    type_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "post",
    tableName: "post",
    timestamps: false,
    sequelize: db.loveBlog,
  }
);

module.exports = Post;
