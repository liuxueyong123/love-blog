import { Model, DataTypes } from 'sequelize'
import * as db from './db'

class UserModel extends Model {
  id!: string
  account!: string
  name!: string
  gender!: number
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'user',
    tableName: 'user',
    timestamps: false,
    sequelize: db.loveBlog
  }
)

export default UserModel
