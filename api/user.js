// 用户信息管理
const userSvc = require('../service/user')

// 创建用户
const createUser = async (ctx) => {
  try {
    const { userName, password } = ctx.request.body
    await userSvc.createUser(userName, password)
    ctx.body = '创建成功'
  } catch(err) {
    ctx.body = err.message
    console.log(err)
  }
}

module.exports.router = ({root, unroot}) => {
  unroot.post('/user/createUser', createUser)
}