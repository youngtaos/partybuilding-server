"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 引入配置好的 multerConfig
var multerConfig = require('./multerConfig');
// 上传到服务器地址
var BaseURL = 'http://localhost:7001';
// 上传到服务器的目录
var imgPath = '/public/';
var fs = require('fs');
var path = require('path');
// 封装处理路径函数
var handlePath = function (dir) {
    return path.join(__dirname, './', dir);
};
// 封装上传图片的接口
var uploadAvatar = function (req, res) {
    return new Promise(function (resolve, reject) {
        multerConfig.single('file')(req, res, function (err) {
            if (err) {
                reject(err);
            }
            else {
                console.log(req.body.personId, 44);
                // 对图片进行去重删除和重命名
                hanldeImgDelAndRename(req.body.personId, req.file.filename, handlePath('../../public'));
                var img = req.file.filename.split('.');
                console.log(img);
                resolve({
                    id: req.body.personId,
                    img_url: BaseURL + imgPath + img[0] + '.' + req.body.personId + '.' + img[1]
                });
            }
        });
    });
};
// 对图片进行去重删除和重命名
var hanldeImgDelAndRename = function (id, filename, dirPath) {
    // TODO 查找该路径下的所有图片文件
    fs.readdir(dirPath, function (err, files) {
        for (var i in files) {
            // 当前图片的名称
            //console.log(dirPath)
            var currentImgName = path.basename(files[i]);
            // 图片的名称数组：[时间戳, id, 后缀]
            var imgNameArr = currentImgName.split('.');
            // TODO 先查询该id命名的文件是否存在，有则删除
            if (imgNameArr[1] === id) {
                var currentImgPath = dirPath + '/' + currentImgName;
                fs.unlink(currentImgPath, function (err) { });
            }
            // TODO 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: 时间戳.id.jpg
            if (currentImgName === filename) {
                var old_path = dirPath + '/' + currentImgName;
                var new_path = dirPath + '/' + imgNameArr[0] + '.' + id + path.extname(files[i]);
                // 重命名该文件
                fs.rename(old_path, new_path, function (err) { });
            }
        }
    });
};
module.exports = uploadAvatar;
