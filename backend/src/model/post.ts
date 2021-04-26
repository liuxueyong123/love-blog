import { Model, DataTypes, NOW } from 'sequelize'
import * as db from './db'
import UserModel from './user'
import PostLikeModel from './postLike'

class PostModel extends Model {
  id!: number
  publisherId!: number
  content!: string
  publishTime!: string
  typeId!: number
  user?: UserModel
  postLikes?: PostLikeModel[]
}

PostModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    publisherId: {
      type: DataTypes.INTEGER,
      field: 'publisher_id'
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
    modelName: 'post',
    tableName: 'post',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

PostModel.belongsTo(UserModel, { foreignKey: 'publisherId' })
PostModel.hasMany(PostLikeModel, { foreignKey: 'postId' })

export default PostModel
