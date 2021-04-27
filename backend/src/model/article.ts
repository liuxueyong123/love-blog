import { Model, DataTypes, NOW } from 'sequelize'
import * as db from './db'
import UserModel from './user'

class ArticleModel extends Model {
  id!: number
  publisherId!: number
  title!: string
  content!: string
  publishTime!: string
  typeId!: number
  user?: UserModel
}

ArticleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    publisherId: {
      type: DataTypes.INTEGER,
      field: 'publisher_id'
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    publishTime: {
      type: DataTypes.TIME,
      field: 'publish_time',
      allowNull: false,
      defaultValue: NOW
    },
    typeId: {
      type: DataTypes.INTEGER,
      field: 'type_id'
    }
  },
  {
    modelName: 'article',
    tableName: 'article',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

ArticleModel.belongsTo(UserModel, { foreignKey: 'publisherId' })

export default ArticleModel
