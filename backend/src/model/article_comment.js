const { Model, DataTypes } = require('sequelize')
const db = require('./db')

class ArticleComment extends Model {}

ArticleComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    article_id: {
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
    modelName: 'article_comment',
    tableName: 'article_comment',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

module.exports = ArticleComment
