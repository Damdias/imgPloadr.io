
const models = require("../models");
const async = require("async");

module.exports = {
    newest(callback) {
      
        // let comments =
        //     [
        //         {
        //             image_id: 1, email: 'test@testing.com', name: 'Test	Tester', gravatar: 'http://lorempixel.com/75/75/animals/1',
        //             comment: 'This	is	a	test	comment...', timestamp: Date.now(),
        //             image: {
        //                 uniqueId: 1, title: 'Sample	Image	1', description: '', filename: 'me4s6w.jpeg', Views: 0, likes: 0,
        //                 timestamp: Date.now
        //             }
        //         }, {
        //             image_id: 1, email: 'test@testing.com', name: 'Test	Tester', gravatar: 'http://lorempixel.com/75/75/animals/2',
        //             comment: 'Another	followup	comment!', timestamp: Date.now(),
        //             image: { uniqueId: 1, title: 'Sample	Image	1', description: '', filename: 'me4s6w.jpeg', Views: 0, likes: 0, timestamp: Date.now }
        //         }];
        // callback(null,comments);
        let list = [];
        models.CommentModel.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } }, (err, comments) => {
         
            //    let list = [];
            //    let newa = comments.forEach((item) => {
            //         models.ImageModel.findOne({_id:{$eq:item.image_id}},(err,resimg)=>{
            //             list.push ( {
            //                 comment: item.comment,
            //                 timestamp: item.timestamp,
            //                 image: {filename:resimg.filename}
            //             });
            //         });

            //     });

            if (err) {
                throw err;
            }
            let attachedimage = (commet, next) => {
                models.ImageModel.findOne({ _id: { $eq: commet.image_id } }, (err, resimg) => {
                    list.push({
                        comment: commet.comment,
                        timestamp: commet.timestamp,
                        image: { filename: resimg.filename }
                    });
                    next(err);
                });
            };
            async.each(comments, attachedimage, (err) => {
                callback(err, list);
            });

        });
    }
}