import Mock from 'mockjs'
import * as login from './modules/login'
require('./modules/users')
require('./modules/role')
require('./modules/rights')
require('./modules/goods')
require('./modules/goods_categories')
require('./modules/order')
fnCreate(login);
// fnCreate(users,false);
/**
 * 创建mock模拟数据
 * @param {*} mod 模块名
 * @param {boolean} [isOpen=true] 是否开启
 */
function fnCreate (mod, isOpen = true) {
    if (isOpen) {
      for (var key in mod) {
        ((res) => {
          if (res.isOpen !== false) {
            Mock.mock(new RegExp(res.url), res.type, (opts) => {
              opts['data'] = opts.body ? JSON.parse(opts.body) : null
              console.log('\n')
              console.log('%cmock拦截, 请求: ', 'color:blue', opts)
              console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
              delete opts.body
              return res.data
            })
          }
        })(mod[key]() || {})
      }
    }
  }