import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class AlbumModel extends Model {
  id!: number
  imageLink!: string
  pictureTime!: string
  description!: string
  typeId!: number
  uploadAccountId!: number
}

AlbumModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    imageLink: {
      type: DataTypes.STRING,
      field: 'image_link'
    },
    pictureTime: {
      type: DataTypes.STRING,
      field: 'picture_time'
    },
    description: {
      type: DataTypes.STRING
    },
    typeId: {
      type: DataTypes.INTEGER,
      field: 'type_id'
    },
    uploadAccountId: {
      type: DataTypes.INTEGER,
      field: 'upload_account_id'
    }
  },
  {
    modelName: 'album',
    tableName: 'album',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default AlbumModel
