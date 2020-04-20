//进行用户鉴权模块
const jwt = require('jsonwebtoken');   //引入jwt对token进行解密

//jwt解密要通过回调函数来获取数据,但在async/await中,都是同步的,无法通过回调函数获取数据,因此我们要手动封装一个promise来获取数据
function verifyToken(token) {
    return new Promise((resolve,reject)=> {
        jwt.verify(token,'dyLi',(err,data)=> {
            if(err) {
                reject(err)
                return
            }
            resolve(data.data)
        })
    })
}

async function auth (req,res,next) {
    try {
        const {token} = req.headers || req.body || req.query;
        const userData = await verifyToken(token);
        if(userData) {  //token解析成功
            req.user = userData;  //将解析后的token值直接放到req对象上
            next();  //在请求用户信息时,把auth这个鉴权函数放到路由里,鉴权通过后,再通过next()去执行获取用户信息的函数
        }else {  //token解析不成功
            res.json({
                code: 401,
                msg: '登录状态已失效,请重新登录'
            })
        }

    }catch(err) {
        // next(err)
        res.json({
            code: 401,
            msg: '登录状态已失效,请重新登录'
        })
    }
}

module.exports = {auth};

