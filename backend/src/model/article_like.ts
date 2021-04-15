import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class ArticleLike extends Model {}

ArticleLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER
    },
    article_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'article_like',
    tableName: 'article_like',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default ArticleLike
