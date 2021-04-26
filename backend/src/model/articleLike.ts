import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class ArticleLikeModel extends Model {
  id!: number
  accountId!: number
  articleId!: number
}

ArticleLikeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    accountId: {
      type: DataTypes.INTEGER,
      field: 'account_id'
    },
    articleId: {
      type: DataTypes.INTEGER,
      field: 'article_id'
    }
  },
  {
    modelName: 'articleLike',
    tableName: 'article_like',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default ArticleLikeModel
