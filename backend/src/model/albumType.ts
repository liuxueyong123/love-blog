import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class AlbumTypeModel extends Model {
  id!: number
  typeName!: string
  typeDesc!: string
  typeIcon!: string
}

AlbumTypeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    typeName: {
      type: DataTypes.STRING,
      field: 'type_name'
    },
    typeDesc: {
      type: DataTypes.STRING,
      field: 'type_desc'
    },
    typeIcon: {
      type: DataTypes.STRING,
      field: 'type_icon'
    }
  },
  {
    modelName: 'albumType',
    tableName: 'album_type',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default AlbumTypeModel
