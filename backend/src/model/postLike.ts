import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class PostLikeModel extends Model {
  id!: number
  accountId!: number
  postId!: number
}

PostLikeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    accountId: {
      type: DataTypes.INTEGER,
      field: 'account_id'
    },
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id'
    }
  },
  {
    modelName: 'postLike',
    tableName: 'post_like',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default PostLikeModel
