const { Model, DataTypes } = require('sequelize')
const db = require('./db')

class ArticleType extends Model {}

ArticleType.init(
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
    modelName: 'article_type',
    tableName: 'article_type',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

module.exports = ArticleType
