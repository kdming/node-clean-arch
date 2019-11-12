// 跨域
const convert = require('koa-convert')
const cors = require('koa-cors')

const initCors = (app) => {
  app.use(convert(cors({
    origin: '*',
    credentials: true,
    headers: ['Content-Type', 'accept', 'access-token', 'X-CLOUD-TOKEN', 'token', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
    expose: ['Total', 'X-Response-Time', 'Content-Disposition']
  })))
}

module.exports = {
  initCors
}