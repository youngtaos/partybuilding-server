const multer = require('multer')
const path = require('path')

const handlePath = (dir) => {
    return path.join(__dirname, './', dir)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
            cb(null, handlePath('../../public'))
        } else {
            cb({ error: '仅支持 jpg/png/gif 格式的图片！' })
        }
    },
    filename: function (req, file, cb) {
        // 将图片名称分割伪数组，用于截取图片的后缀
        const fileFormat = file.originalname.split('.')
        // 自定义图片名称
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})

const multerConfig = multer({
    storage: storage,
    limits: { fileSize: 2097152 } // 2M
})

module.exports = multerConfig