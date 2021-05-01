import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class PostTypeModel extends Model {
  id!: number
  typeName!: string
  typeDetail!: string
  typeIcon!: string
}

PostTypeModel.init(
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
    modelName: 'postType',
    tableName: 'post_type',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default PostTypeModel
