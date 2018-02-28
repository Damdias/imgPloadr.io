const path = require("path");
const fs = require("fs");
const ImageModel = require("../models").ImageModel;
const CommentModel = require("../models").CommentModel;
const md5 = require("md5");

class ImageController {
    constructor() {
        this.images = [];
        this.likes = 0;
    }
    index(req, res) {
        const ViewModel = {
            image: {},
            comments: []
        };
        ImageModel.findOne({ filename: { $eq: req.params.image_id } }, (err, image) => {
            if (err) throw err;
            ViewModel.image = image;
            CommentModel.find({ image_id: { $eq: image._id } }, (err, comments) => {
                ViewModel.comments = comments;
                res.render("image", ViewModel);
            });

        });
    }
    create(req, res) {
        let nextid = this.images.length + 1;
        this.images.push({
            uniqueId: nextid,
            filename: 'text' + nextid + '.png',
            title: 'test' + nextid + ' imag',

        });
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let imgUrl = '';
        for (let i = 0; i < 6; i += 1) {
            imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        const tempPath = req.file.path,
            ext = path.extname(req.file.filename).toLowerCase(),
            targetPath = path.resolve(`public/upload/${imgUrl}${ext}`),
            imageName = imgUrl + ext;
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            fs.rename(tempPath, targetPath, (err) => {
                if (err) throw err;

            });
        } else {
            fs.unlink(tempPath, () => {
                if (err) throw err;
                res.json(500, {
                    error: 'Only	image	files	are	allowed.'
                });
            });
        }
        let newimage = new ImageModel({
            title: req.body.title,
            description: req.body.description,
            filename: imageName,
        });
        newimage.save((err) => {
            if (err) {
                throw err;
            }
            res.redirect(`/images/${imageName}`);
        });
    }
    like(req, res) {
        ImageModel.findOne({ filename: { $eq: req.params.image_id } }, (err, image) => {
            if (err) throw err;
            let count = image.likes + 1;
            image.likes = count;
            image.save();
            // ImageModel.update({ filename: { $eq: req.params.image_id } }, { $set: { likes: count } }, (err, img) => {
            //     console.log("update likes");
            // });
            res.json({ likes: count });
        });

    }
    comments(req, res) {
        ImageModel.findOne({ filename: { $eq: req.params.image_id } }, (err, image) => {
            if (err) res.redirect("/");
            let newcomment = new CommentModel();
            newcomment.name = req.body.name;
            newcomment.email = req.body.email;
            newcomment.comment = req.body.comment;
            newcomment.image_id = image._id;
            newcomment.gravatar = md5(req.body.email);
            newcomment.save(err, (c) => {
                res.redirect(`/images/${image.filename}#${newcomment._id}`);
            });

        });
        // res.send("The image: comment POST controller");
    }
}

module.exports = ImageController