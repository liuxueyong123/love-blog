import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    publisher_id: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.TEXT
    },
    publish_time: {
      type: DataTypes.STRING
    },
    type_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'post',
    tableName: 'post',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default Post
