const uploadUtil = require('../../utils/upload');   //引入封装好的七牛云上传组件

async function upload (req,res,next) {
    try{
        res.json({
            code: 200,
            data: {
                token: uploadUtil()
            }
        })
    }catch(err) {
        next(err)
    }
}

module.exports = {upload};