const Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments');
module.exports = (ViewModel, callback) => {
    ViewModel.sidebar = {
        stats: Stats(), popular: Images.popular(), comments: Comments.newest()
    }; 
    callback(ViewModel);
};
