// 用户信息
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  })
  // 需要关联时打开
  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // }
  return User
}