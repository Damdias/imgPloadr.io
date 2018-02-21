const sidebar = require("../helpers/sidebar");
class HomeController{
    index(req,res){
        let viewmodel = {title:"home"};

        sidebar(viewmodel,(vmodel)=>{
            res.render("index",vmodel);
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