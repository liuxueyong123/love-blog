const ViewRouter = require('./viewRouter.js');
const ApiRouter = require('./apiRouter')

const router = (app) => {
  app.use(ApiRouter);
  app.use(ViewRouter.routes());
};

module.exports = router;
