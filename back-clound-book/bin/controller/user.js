const userModel = require('../model/user');
const smsModel = require('../model/smsCode');   //引入验证码集合骨架
const validator = require('validator');   //验证用户信息
const SignUtil = require('../../utils/signToken');   //引入生成token的模块
const mongoose = require('mongoose');
const auth = require('./auth');   //鉴权函数  在请求用户信息时,进行鉴权

//用户注册接口  (正常情况下,通过手机发送的验证码来判断)
// async function register(req,res,next) {
//     try {
//         const {phone,code,password} = req.body;
//         const phoneStatus = validator.isMobilePhone(phone,'zh-CN');  //验证手机号是不是中国的
//         if(phoneStatus) { //验证通过
//             const user = await userModel.findOne({
//                 phone: phone
//             });
//             if(user) { //用户已经注册过了
//                 res.json({
//                     code:400,
//                     msg: '对不起,该用户已经注册'
//                 })
//             }else { //用户未注册
//                 const smsCode = await smsModel.findOne({
//                     code: code
//                 }).sort({_id: -1});   //根据前端提交的验证码在数据库中进行从后往前查找(保证是最新的验证码)
//                 if(smsCode) { //判断是否已经发送验证码
//                     let smsCodeDate = new Date(smsCode.updateTime);  //获取验证码在数据库的创建时间
//                     let smsCodeTime = Math.round(smsCodeDate.getTime()/1000); //将毫秒转换为时间,可能出现小数,所以四舍五入
//                     let nowTime = Math.round(Date.now()/1000);   //获取当前的时间
//                     if((nowTime - smsCodeTime) < 60 * 5) {  //验证码在有效期内
//                         //还要判断验证码是否符合规则  这里没有进行判断
//                         if(code == smsCode.code) {  //验证验证码是否正确
//                             await userModel.create({
//                                 phone: phone,
//                                 password: password
//                             })
//                             res.json({
//                                 code: 200,
//                                 msg: '注册成功'
//                             })
//                         }else {  //验证码不正确
//                             res.json({
//                                 code: 400,
//                                 msg: '验证码不正确'
//                             })
//                         }
//                     }else {  //验证码过期
//                         res.json({
//                             code: 400,
//                             msg: '验证码已过期'
//                         })
//                     }
//                 }else { //没有发送过验证码
//                     res.json({
//                         code: 400,
//                         msg: '验证码不正确'
//                     })
//                 }
//             }
//         }else {
//             res.json({
//                 code: 400,
//                 msg: '手机格式不正确'
//             })
//         }
//     }catch (err) {
//         next(err)
//     }
// };

//用户注册接口   这里没有使用手机发送验证码的功能 测试使用
async function register(req, res, next) {
    try {
        const {phone, password} = req.body;
        // console.log(phone,'phone');
        let phoneN = Number(phone);
        const phoneStatus = validator.isMobilePhone(phone, 'zh-CN');
        if (phoneStatus) {
            const phone = await userModel.findOne({
                phone: phoneN
            });
            if (phone) {  //手机号已经注册过了
                res.json({
                    code: 400,
                    msg: '对不起,该用户已经注册过了'
                })
            } else {  //手机号没有注册
                await userModel.create({
                    phone: phoneN,
                    password: password
                });
                res.json({
                    code: 200,
                    msg: '注册成功'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '手机格式不正确'
            })
        }

    } catch (err) {
        next(err)
    }
};

//用户登录接口
async function login(req, res, next) {
    try {
        const {phone, password} = req.body;
        // let phoneNum = Number(phone)
        if (phone && password) {
            const user = await userModel.findOne({
                phone
            });
            // console.log(11111111111111,user)
            if (user) {
                if (password == user.password) {
                    // console.log(11111111111, user._id)
                    let token = SignUtil({userId: user._id});
                    res.json({
                        code: 200,
                        data: {
                            token
                        }
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '用户密码不正确'
                    })
                }
            } else {
                res.json({
                    code: 400,
                    msg: '用户不存在'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '缺少必要的参数'
            })
        }
    } catch (err) {
        next(err)
    }

}

//获取用户信息
async function getUser(req, res, next) {
    try {
        // console.log(req.user)
        const userId = req.user.userId;
        //获取用户信息   使用.select将password给筛选掉,不需要给前端显示用户密码
        const userData = await userModel.findById(mongoose.Types.ObjectId(userId)).select('-password');
        res.json({
            code: 200,
            data: userData
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {register, login, getUser};