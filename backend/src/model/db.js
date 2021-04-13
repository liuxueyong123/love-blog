const { Sequelize } = require('sequelize')
const config = require('../../config')

const loveBlog = new Sequelize(config.mysql)

module.exports = {
  loveBlog
}
