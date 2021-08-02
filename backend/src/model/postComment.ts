import { Model, DataTypes, NOW } from 'sequelize'
import * as db from './db'
import UserModel from './user'

class PostCommentModel extends Model {
  id!:number
  accountId!: number
  postId!:number
  content!:string
  publishTime!:string
  user?: UserModel
}

PostCommentModel.init(
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
    },
    content: {
      type: DataTypes.STRING
    },
    publishTime: {
      type: DataTypes.TIME,
      field: 'publish_time',
      allowNull: false,
      defaultValue: NOW
    }
  },
  {
    modelName: 'postComment',
    tableName: 'post_comment',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

PostCommentModel.belongsTo(UserModel, { foreignKey: 'accountId' })

export default PostCommentModel
