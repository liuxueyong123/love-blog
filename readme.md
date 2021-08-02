## Quick Start

### 1. Create Database
Just run `/backend/sql/init.sql` in your database
### 2. Create two config files
Frontend config: `/website/config.js`
``` js
const config = {
  oss: {
    region: 'xxx', // your oss region
    accessKeyId: 'xxx', // your oss accessKeyId
    accessKeySecret: 'xxx', // your oss accessKeySecret
    bucket: 'xxx' // your oss bucket
  },
};

module.exports = config;
```   
Backend config:  `/backend/config.ts`
``` ts
const config = {
  mysql: {
    host: "xxx", // your mysql host
    port: 3306,
    dialect: "mysql",
    database: "xxx", // your mysql database
    username: "xxx", // your mysql username
    password: "xxx", // your mysql password
    timezone: "+08:00",
    // eslint-disable-next-line no-console
    logging: false,
    connectionLimit: 20,
    pool: {
      max: 15,
      min: 5,
      idle: 1000,
    },
  },
  oss: {
    region: 'xxx', // your oss region
    accessKeyId: 'xxx', // your oss accessKeyId
    accessKeySecret: 'xxx', // your oss accessKeySecret
    bucket: 'xxx' // your oss bucket
  },
  authSecret: 'xxx', // your auth secret for login cookie (It can be anything that just you know)
  wxPusher: {  // wxPusher will push message to your weChat. More information here: https://wxpusher.zjiecode.com/admin/main/wxuser/list
    appToken: 'xxx', // your wxPusher appToken
    contentType: 1,
    uids: [
      'xxx',// wxPusher userId that you want to send message
      'xxx' // wxPusher userId that you want to send message
    ]
  }
}

export default config
```

### 3. Dev
``` js
// start frontend
cd ./website
yarn add
yarn start

// start backend
cd ./backend
yarn add
yarn start
```

### 4. Build && Publish
``` js
// frontend
yarn build

// backend
tsc
node ./dist/index.js
```

## TODO
- 相册模块
- 文章模块
- 新内容发布时通知到微信 ✅
