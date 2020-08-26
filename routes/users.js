var express = require('express');
var router = express.Router();
var Mock = require('mockjs')

// 处理跨域的中间件
var cors = require('cors')
/* GET users listing. */

// 通过通配符请求数据
const generatorDataById = (id) => {
  // return Mock.mock({
  //   code:200,
  //   data: {}
  // })
  return Mock.mock({
    "code": 200,
    data: {
      id,
      "title": "@ctitle(15, 25)",
      "author": "@cname",
      "volume": "@int(100, 300)",
      "createAt": "@int(10000000000000, 1554363040517)"
    }
  })
}
// 请求分页数据
const generatorData = (limit = 10, offset = 20) => {
  return Mock.mock({
    code: 200,
    data: {
      currentPage: (offset / limit) + 1,
      isLastPage: false,
      total: 10000,
      [`list|${limit}`]: [{
        "title": "@ctitle(15, 25)",
        "author": "@cname",
        "volume": "@int(100, 300)",
        "createAt": "@int(10000000000000, 1554363040517)"
      }]
    }
  })
}

// 以下可以理解为请求详情
// router.get('/:id', function (req, res, next) {
//   // 以下为URL请求
//   // http://localhost:3000/users/22
//   const {
//     id
//   } = req.params; //注意params和query的区别
//   res.json(generatorDataById(id))
// });


// 以下为请求分页数据
router.get('/', function (req, res, next) {
  // 以下为URL请求
  // http://localhost:3000/users?limit=10&offset=30
  const {
    limit,
    offset
  } = req.query;
  res.json(generatorData(limit, offset))
})

// 跨域测试（jsonp）
router.get('/jsonp', function (req, res, next) {

  res.jsonp(generatorData())
})

// 跨域测试（express原生处理跨域）
router.get('/json/header', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.json(generatorData())
})


// 跨域测试（express用第三方的包（使用中间件）这是单独的用在某个路由上，全局使用的话app.use
router.get('/json/cors', cors(), function (req, res, next) {
  res.json(generatorData())
})
module.exports = router;