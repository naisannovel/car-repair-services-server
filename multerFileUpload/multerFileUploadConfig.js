const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'media/img')
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileName = `${file.originalname.replace(ext,'').toLowerCase().split(' ').join('-')}-${uniqueSuffix}${ext}`;
        cb(null,fileName);
    }
})

module.exports = multer({
    storage: multerStorage,
    limits:{
        fileSize: 1000000
    },
    fileFilter:function(req,file,cb){
        if(file.mimetype === 'image/png'||
            file.mimetype === 'image/jpeg'||
            file.mimetype === 'image/png'){
                cb(null,true)
            }else{
                cb(new Error('only .png, .jpg, .jpeg format allowed'))
            }
    }
}).single('photo');