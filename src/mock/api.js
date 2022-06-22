import Mock from 'mockjs'
Mock.mock('/api/user/login', {
  status: 0,
  data: {
    'id|20-40': 12, // 随机生产20-40之间的数
    // username: 'admin',
    // username: '@name', // 随机生产一个英文名
    username: '@cname', // 随机生产一个中文名
    email: 'admin@51purse.com',
    phone: null,
    role: 0,
    createTime: 1479048325000,
    updateTime: 1479048325000
  }
})
