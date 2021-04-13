const { Model, DataTypes } = require('sequelize')
const db = require('./db')

class AlbumType extends Model {}

AlbumType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING
    },
    type_desc: {
      type: DataTypes.STRING
    },
    type_icon: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'album_type',
    tableName: 'album_type',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

module.exports = AlbumType
