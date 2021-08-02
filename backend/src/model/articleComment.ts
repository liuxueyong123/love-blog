import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class ArticleCommentModel extends Model {
  id!: number
  articleId!: number
  content!: string
  publishTime!: string
}

ArticleCommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    articleId: {
      type: DataTypes.INTEGER,
      field: 'article_id'
    },
    content: {
      type: DataTypes.STRING
    },
    publishTime: {
      type: DataTypes.STRING,
      field: 'publish_time'
    }
  },
  {
    modelName: 'articleComment',
    tableName: 'article_comment',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default ArticleCommentModel
