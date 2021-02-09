const ViewRouter = require('./viewRouter.js');

const router = (app) => {
  app.use(ViewRouter.routes());
};

module.exports = router;
