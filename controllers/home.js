const sidebar = require("../helpers/sidebar"),
      ImageModel = require("../models").ImageModel;
class HomeController{
    index(req,res){
        let viewmodel = {title:"home"};
        ImageModel.find({},{},{sort:{timestamp:-1}},(err,images)=>{
            if(err){
                throw err;
            }
            viewmodel.images = images;
            sidebar(viewmodel,(vmodel)=>{
                res.render("index",vmodel);
            });
        });
       
       
    }
    create(req,res){
        res.send({res:'got result'});
    }
}

// module.exports  = {
//     index(req,res){
//         res.render("index",{title:'Image upload'});
//     },
//     create(req,res){
//         console.log(req);
//         res.send({res:'got result'});
//     }
// };

module.exports =  HomeController;