//使用jwt 进行加密操作
const jwt = require('jsonwebtoken');

const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60),  //设置token的过期时间
    data: {  //要加密的数据
        userId: '001'
    }
}, 'lowell');  // lowell  是我们自己设置的加密秘钥

console.log(token);