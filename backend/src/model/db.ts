import { Sequelize, Options } from 'sequelize'
import config from '../../config'

export const loveBlog = new Sequelize(config.mysql as Options)
