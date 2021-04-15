import { Model, DataTypes } from 'sequelize'
import * as db from './db'

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
      type: DataTypes.STRING
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

export default ArticleComment
