

const Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments'),
    async = require("async");

module.exports = (ViewModel, callback) => {
    async.parallel([
        (next) => {
            next(null, Stats());
        },
        (next) => {
            next(null, Images.popular());
        },
        (next) => {
            Comments.newest(next);
        }
    ], (err, results) => {
        ViewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            Comments: results[2]
        };
        console.log(ViewModel);
        console.log(ViewModel.sidebar.Comments[0].comment);
        callback(ViewModel);
    });
    // ViewModel.sidebar = {
    //     stats: Stats(), popular: Images.popular()
    // };
    // Comments.newest((err, comments) => {

    //     ViewModel.sidebar.comments = comments;
    // });
    // callback(ViewModel);
};
