
const express =require("express"),
router = express.Router(),
home =  require("../controllers/home"),
image = require("../controllers/image"),
path = require("path");
let multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(__dirname,'../public/upload/temp'))
    },
    filename: function (req, file, cb) {
     cb(null,Date.now() +"-"+ file.originalname);
    }
  });
  let upload = multer({storage});
let homeController = new home();
let imageController = new image();
module.exports = (app)=>{
    router.get("/",homeController.index);
    router.post("/create", homeController.create);
    router.get("/images/:image_id",imageController.index);
    router.post("/images",upload.single('file'),(req,res)=>imageController.create(req,res));
    router.post("/images/:image_id/like",imageController.like);
    router.post("/images/:image_id/comment",imageController.comments);
    app.use(router);
    return app;
}