const rq = require('request-promise');
const cheerio = require('cheerio');
const bookModel = require('../model/book');    //书籍集合骨架
const titleModel = require('../model/title');  //书籍目录集合骨架
const articleModel = require('../model/article'); //书籍内容集合骨架

//在网上爬取一整本书
async function getBook(req, res, next) {
    //第一步：请求书籍的网址
    //第二步：拿到书的描述、书的标题在book集合中创建一个书籍记录
    //第三步：拿到目录,根据目录链接,去请求每一篇文章的内容,存储到目录和文章中
    //第四步：爬取完成
    try {
        const {url, img, author, title} = req.body;
        const data = await rq.get(url);
        let $ = cheerio.load(data);
        let desc;
        desc = $('meta[name="description"]').attr('content');
        const book = await bookModel.create({
            title,
            img,
            author,
            desc
        });
        let baseUrl;
        let titlesUrlArr = [];   //存放目录的跳转路径
        let titlesText = [];   //存放目录
        let titleEle = $('.catalog a'); //获得所有符合条件的dom元素的数组
        //https://www.kancloud.cn/tass/es6/458815 将458815删除  https://www.kancloud.cn/tass/es6为基础路径
        let titleArr = url.split('/');  //字符串转数组
        titleArr.pop();   //删除数组的最后一项并返回一个新数组
        baseUrl = titleArr.join('/') + '/';
        //jquery语法，遍历一个数组
        titleEle.each((index, item) => {   //得到所有的目录跳转路径和目录
            titlesUrlArr.push(baseUrl + $(item).attr('href'));
            titlesText.push($(item).text())
        });
        for (let i = 0; i < titlesUrlArr.length; i++) {
            let item = titlesUrlArr[i];
            // console.log(item);
            let index = i;
            let articleData = await rq.get(item);
            let $ = cheerio.load(articleData);
            let content = $('.content').text();
            const title = await titleModel.create({
                bookId: book._id,
                index,
                title: titlesText[index],
                total: titlesUrlArr.length
            });
            const article = await articleModel.create({
                bookId: book._id,
                content,
                index,
                titleId: title._id
            });
        }
        res.json({
            code: 200,
            msg: '爬取成功'
        })
    } catch (err) {
        next(err)
    }
}

//获取一本书籍的详情
async function getBookArticle(req,res,next) {
    try {
        let {id} = req.params;
        const data = await bookModel.findById(id);
        res.json({
            code: 200,
            data
        })
    }catch(err) {
        next(err)
    }
}

//删除一本书籍
async function removeBook(req,res,next) {
    try {
        const {id} = req.params;
        await bookModel.deleteOne({id});
        res.json({
            code: 200,
            msg: '删除成功'
        })
    }catch (err) {
        next(err)
    }
}

//获取全部的书籍
async function getAllBook(req,res,next) {
    try {
        const data = await bookModel.find();
        res.json({
            code: 200,
            data
        })
    }catch(err) {
        next(err)
    }
}

module.exports = {
    getBook,
    getBookArticle,
    getAllBook,
    removeBook
};