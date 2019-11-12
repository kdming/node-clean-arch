const koaRouter = require('koa-router')
const path = require('path')
const fs = require('fs')

const initRouter = (app) => {
  try {

    // 创建管理与非管理路由
    apiPrefix = {prefix: '/api'}
    const root = new koaRouter(apiPrefix)
    const unroot = new koaRouter(apiPrefix)

    // 加载路由列表
    const routerPath = path.join(`${__dirname}/../api`)
    const files = fs.readdirSync(routerPath)
    for (file of files) {
      console.log(routerPath + '/' + file)
      require(routerPath + '/' + file).router({ root, unroot })
    }
    app.use(root.routes())
    app.use(unroot.routes())

    console.log('路由加载完毕')

  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  initRouter
}