const { Model, DataTypes } = require('sequelize')
const db = require('./db')

class PostComment extends Model {}

PostComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.Text
    },
    publish_time: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'post_comment',
    tableName: 'post_comment',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

module.exports = PostComment
