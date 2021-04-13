const { Model, DataTypes } = require('sequelize')
const db = require('./db')

class Album extends Model {}

Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    image_link: {
      type: DataTypes.STRING
    },
    picture_time: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    type_id: {
      type: DataTypes.INTEGER
    },
    upload_account_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'album',
    tableName: 'album',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

module.exports = Album
