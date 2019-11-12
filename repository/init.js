// 数据库初始化
const sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')

const config = require('../config')

// 全局Database
const DB = {}

// 数据库初始化
const initDataBase = async () => {
  try {

    // 根据环境来链接数据库
    const configs = config.parsed
    let url =  ''
    if (configs.env === 'test') {
      url = config.parsed.msSqlTest
    } else {
      url = config.parsed.msSql
    }

    // 准备链接数据库
    if (url == '' || typeof url === 'undefined') {
      return '数据库连接失败，配置不合法'
    }
    const msSql =  new sequelize(url, {dialect: 'mssql'})
    const isConnect = await new Promise((resolve, reject) => {
      msSql.authenticate()
      .then(() => {
        resolve(true)
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        resolve(false)
        console.error('Unable to connect to the database:', err);
      });
    })
    if (!isConnect) {
      return '连接失败，发生异常'
    }

    // 加载models
    const modelPath = path.join(`${__dirname}/../models`)
    const files = fs.readdirSync(modelPath)
    for (let file of files) {
      if (!/.js/.test(file)) continue
      const model = msSql['import'](modelPath + '/' + file)
      model.sync() 
      DB[model.name] = model
    }
    // 动态关联model
    Object.keys(DB).forEach(modelName => {
      if (DB[modelName].associate) {
        DB[modelName].associate(DB)
      }
    });
  
    DB.sequelize = sequelize

    return ''

  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  DB,
  initDataBase
}