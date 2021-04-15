const config = {
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    database: 'love_blog',
    username: 'root',
    password: '',
    timezone: '+08:00',
    // eslint-disable-next-line no-console
    logging: false,
    connectionLimit: 20,
    pool: {
      max: 10,
      min: 1,
      idle: 1000
    }
  }
}

export default config
