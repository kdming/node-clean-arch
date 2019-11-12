// 初始化所有中间件
const koaStatic = require('koa-static')
const koaBody = require('koa-body')

const router = require('./router')
const cors = require('./cors')

const initMiddlware = (app) => {
  app.use(koaBody())
  app.use(koaStatic('static'))
  router.initRouter(app)
  cors.initCors(app)
}

module.exports = {
  initMiddlware
}