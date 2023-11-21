import { BodyRequest } from "../controller";

// 引入配置好的 multerConfig
const multerConfig = require('./multerConfig');

// 上传到服务器地址
const BaseURL = 'http://localhost:7001';
// 上传到服务器的目录
const imgPath = '/public/';
const fs = require('fs');
const path = require('path');
// 封装处理路径函数
const handlePath = (dir: string) => {
    return path.join(__dirname, './', dir)
}

// 封装上传图片的接口
const uploadAvatar = (req: any, res: Response) => {
    return new Promise((resolve, reject) => {
        multerConfig.single('file')(req, res, function (err: any) {
            if (err) {
                reject(err)
            } else {
                console.log(req.body.personId, 44)
                // 对图片进行去重删除和重命名
                hanldeImgDelAndRename(req.body.personId, req.file.filename, handlePath('../../public'))
                const img = req.file.filename.split('.')
                console.log(img);
                resolve({
                    id: req.body.personId,
                    img_url: BaseURL + imgPath + img[0] + '.' + req.body.personId + '.' + img[1]
                })
            }
        })
    })

}


// 对图片进行去重删除和重命名
const hanldeImgDelAndRename = (id: any, filename: string, dirPath: string) => {

    // TODO 查找该路径下的所有图片文件
    fs.readdir(dirPath, (err: any, files: any) => {
        for (let i in files) {
            // 当前图片的名称
            //console.log(dirPath)
            const currentImgName = path.basename(files[i])
            // 图片的名称数组：[时间戳, id, 后缀]
            const imgNameArr = currentImgName.split('.')

            // TODO 先查询该id命名的文件是否存在，有则删除
            if (imgNameArr[1] === id) {
                const currentImgPath = dirPath + '/' + currentImgName
                fs.unlink(currentImgPath, (err: any) => { })
            }

            // TODO 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: 时间戳.id.jpg
            if (currentImgName === filename) {
                const old_path = dirPath + '/' + currentImgName
                const new_path = dirPath + '/' + imgNameArr[0] + '.' + id + path.extname(files[i])
                // 重命名该文件
                fs.rename(old_path, new_path, (err: any) => { })
            }
        }
    })
}

module.exports = uploadAvatar;

