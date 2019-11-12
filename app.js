
const koa = require('koa')

const repository = require('./repository/init')
const middleware = require('./middleware')
const config = require('./config')

const app = new koa()

repository.initDataBase().then((err) => {
  if (err != '') {
    console.log('启动失败', err)
  } else {
    middleware.initMiddlware(app)
    const appPort = config.parsed.appPort || 9090
    app.listen(appPort)
    console.log('启动成功', appPort)
  }
})