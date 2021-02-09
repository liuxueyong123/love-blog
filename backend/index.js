const Koa = require('koa');
const router = require('./src/router/index.js');
const app = new Koa();
const port = 8081;

router(app);
app.listen(port, async() => {
  console.log(`Http Server is running on ${port}`);
});
