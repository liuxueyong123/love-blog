import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class ArticleType extends Model {}

ArticleType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING
    },
    type_desc: {
      type: DataTypes.STRING
    },
    type_icon: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'article_type',
    tableName: 'article_type',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default ArticleType
