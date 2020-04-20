const smsCodeModel = require('../model/smsCode');
const sms = require('../../utils/smsUtils');   //引入封装好的发送短信的模块
const userModel = require('../model/user');   //引入用户模块

//发送验证码接口
async function sendCode(req, res, next) {
    try {
        //注意：虽然前端已经对手机号做过了验证,但是后端还是要再验证一次,使用validator 进行验证;在这里没有写,但在实际中要写
        const {phone} = req.body;
        const isUser = await userModel.findOne({
            phone
        });
        if (!isUser) {  //如果用户没有注册,才可以发送注册验证码短信
            let strCode = '';
            //取一个六位随机数字
            for (let i = 0; i < 6; i++) {
                strCode += Math.floor(Math.random() * 10) + '';
            }
            // console.log(strCode);
            const smsRes = await sms(phone, strCode);
            if (smsRes.code == 'OK') {
                await smsCodeModel.create({  //将通过验证的手机号和验证码存储进数据库
                    phone,
                    code: strCode
                });
                res.json({
                    code: 200,
                    msg: '短信发送成功'
                })
            } else {
                res.json({
                    code: 500,
                    msg: smsRes.Code
                })
            }
        } else {//用户已经注册过了
            res.json({
                code: 400,
                msg: '对不起,您已经注册过了'
            })

        }
    } catch (err) {
        next(err)
    }
}

module.exports = {sendCode};