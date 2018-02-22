const mongoose = require("mongoose"),
      Schema = mongoose.Schema,
      path = require("path");

      const ImageSchema = new Schema({
          title:{type:String},
          description:{type:String},
          filename:{type:String},
          views:{type:Number, default:0},
          likes:{type:Number, default:0},
          timestamp:{type: Date, default : Date.now}
      }) ;

      ImageSchema.virtual("UniqueId")
      .get(function(){
          return this.filename.replace(path.extname(this.filename),"");
      });

       module.exports = mongoose.model('Image',ImageSchema);