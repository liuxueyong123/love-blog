import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    publisher_id: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.TEXT
    },
    publish_time: {
      type: DataTypes.STRING
    },
    type_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'article',
    tableName: 'article',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default Article
