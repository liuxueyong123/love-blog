import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class ArticleTypeModel extends Model {
  id!: number
  typeName!: string
  typeDetail!: string
  typeIcon!: string
}

ArticleTypeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    typeName: {
      type: DataTypes.STRING,
      field: 'type_name'
    },
    typeDetail: {
      type: DataTypes.STRING,
      field: 'type_detail'
    },
    typeIcon: {
      type: DataTypes.STRING,
      field: 'type_icon'
    }
  },
  {
    modelName: 'articleType',
    tableName: 'article_type',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default ArticleTypeModel
