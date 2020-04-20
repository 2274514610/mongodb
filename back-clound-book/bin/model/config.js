const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/cloud-html',{ useUnifiedTopology: true,useNewUrlParser: true})

const db = mongoose.connection;
//once  只监听一次
db.once('open',function () {
    console.log('数据库连接成功');
});

//在项目入口app.js中引入db
module.exports = db;