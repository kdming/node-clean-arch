// CURD 通用方法列表
const DB = require('./init').DB

/**
 * 创建数据
 * @param {String} model 模型名称
 * @param {Object} params 数据详情
 */
const create = async (model, params) => {
  try {
    const result = await DB[model].create(params)
    return result
  } catch(err) {
    throw err
  }
}

/**
 * 查询一条数据
 * @param {String} model 模型名称
 * @param {Object} where 查询条件
 * @param {Array} attributes 选择返回的字段
 */
const findOne = async (model, where, attributes) => {
  try {
    const result = await DB[model].findOne({
      where,
      attributes
    })
    return result
  } catch(err) {
    throw err
  }
}

/**
 * 查询全部数据
 * @param {String} model 模型名称
 * @param {Object} where 查询条件
 */
const findAll = async (model, where) => {
  try {
    const result = await DB[model].findAll({where})
    return result
  } catch(err) {
    console.log(err)
  }
}

/**
 * 分页查询
 * @param {String} model 模型名称
 * @param {int} page 页码
 * @param {int} limit 每页限制
 * @param {Object} where 查询条件
 */
const findByPage = async (model, page, limit, where) => {
  try {
    let offset = 0
    if (page <= 1) {
      offset = 0
    } else {
      offset = (page - 1) * limit
    }
    const result = await DB[model].findAll({where, offset, limit})
    const count = await DB[model].count({where})
    return result, count
  } catch(err) {
    console.log(err)
  }
}

/**
 * 数据更新
 * @param {String} model 模型名称
 * @param {Object} where 更新条件
 * @param {Object} update 更新字段
 */
const update = async (model, where, update) => {
  try {
    const result = DB[model].update(
      update,
      { where }
    )
    return result
  } catch(err) {
    console.log(err)
  }
}

/**
 * 删除数据
 * @param {String} data 要删除的数据
 * @param {Object} force 是否强制删除
 */
const destroy = async (data, force) => {
  try {
    const result = await data.destroy({force})
    return result
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  create,
  findOne,
  findAll,
  findByPage,
  update,
  destroy
}