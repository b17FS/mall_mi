let baseURL
switch (process.env.NODE_ENV) {
  case 'production':
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api'
    break
  case 'test':
    baseURL = 'http://tes-tmall-pre.springboot.cn/api'
    break
  default:
    baseURL = 'http://test-mall-pre.springboot.cn/api'
    break
}

export default {
  baseURL
}
