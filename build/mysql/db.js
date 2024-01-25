var mysql = require('mysql');
var config = require('./config').db; // 获取数据库配置信息
module.exports = mysql.createConnection(config); // mysql.createConnection 方法创建连接实例
