import { Model, DataTypes, NOW } from 'sequelize'
import * as db from './db'
import UserModel from './user'
import PostLikeModel from './postLike'
import PostCommentModel from './postComment'
import PostTypeModel from './postType'

class PostModel extends Model {
  id!: number
  publisherId!: number
  content!: string
  publishTime!: string
  typeId!: number
  imgList!: string
  user?: UserModel
  postLikes?: PostLikeModel[]
  postComments?: PostCommentModel[]
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
    imgList: {
      type: DataTypes.TEXT,
      field: 'img_list'
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
PostModel.hasMany(PostCommentModel, { foreignKey: 'postId' })
PostModel.belongsTo(PostTypeModel, { foreignKey: 'typeId' })

export default PostModel
