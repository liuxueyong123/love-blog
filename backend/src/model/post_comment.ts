import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class PostComment extends Model {}

PostComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING
    },
    publish_time: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'post_comment',
    tableName: 'post_comment',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default PostComment
