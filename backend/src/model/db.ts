import { Sequelize, Options } from 'sequelize'
const config = require('../../config')
// import config from '../../config'

export const loveBlog = new Sequelize(config.mysql as Options)
