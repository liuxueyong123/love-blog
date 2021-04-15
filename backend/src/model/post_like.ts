import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class PostLike extends Model {}

PostLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER
    },
    post_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'post_like',
    tableName: 'post_like',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default PostLike
