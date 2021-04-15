import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class PostType extends Model {}

PostType.init(
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
    modelName: 'post_type',
    tableName: 'post_type',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default PostType
