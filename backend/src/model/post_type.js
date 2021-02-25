const { Model, DataTypes } = require("sequelize");
const db = require("./db");

class PostType extends Model {}

PostType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING,
    },
    type_desc: {
      type: DataTypes.STRING,
    },
    type_icon: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "post_type",
    tableName: "post_type",
    timestamps: false,
    sequelize: db.loveBlog,
  }
);

module.exports = PostType;
