// 用户信息ctl
const CURD = require('../repository/curd')

// 创建用户
const createUser = async (userName, password) => {
  try {
    await CURD.create('User', { userName, password })
  } catch(err) {
    throw err
  }
}

module.exports = {
  createUser
}