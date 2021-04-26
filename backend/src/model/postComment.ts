import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class PostCommentModel extends Model {
  id!:number
  postId!:number
  content!:string
  publishTime!:string
}

PostCommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id'
    },
    content: {
      type: DataTypes.STRING
    },
    publishTime: {
      type: DataTypes.STRING,
      field: 'publish_time'
    }
  },
  {
    modelName: 'postComment',
    tableName: 'post_comment',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default PostCommentModel
