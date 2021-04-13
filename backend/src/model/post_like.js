const { Model, DataTypes } = require('sequelize')
const db = require('./db')

class PostLike extends Model {}

PostLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER
    },
    post_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'post_like',
    tableName: 'post_like',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

module.exports = PostLike
