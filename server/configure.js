const path = require("path"),
    routes = require("./routes"),
    exphbs = require("express-handlebars"),
    express = require("express"),
    bodyparser = require("body-parser"),
    cookieparser = require("cookie-parser"),
    morgan = require("morgan"),
    methodOverride = require("method-override"),
    errorHandler = require("error-handler"),
    moment = require("moment"),
    multer = require("multer");


module.exports = (app) => {
    app.use(morgan('dev'));
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());
    app.use(methodOverride());
    app.use(cookieparser('aomw'));

    routes(app);
console.log(path.join(__dirname, '../public'));
    app.use('/public', express.static(path.join(__dirname, '../public')));
    // app.use(multer({
    //     dest: path.join(__dirname,'public/upload/temp'),
    //     fieldn
    // }).single);

    if ('development' === app.get("env")) {
        //  app.use(errorHandler());
    }
    app.engine('handlebars', exphbs.create({
        defaultLayout: "main",
        layoutsDir: path.join(app.get('Views'),"/layouts"),
        partialsDir: [path.join(app.get('Views'),"/partials")],helpers:{
            timeago:(timestamp)=> {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set("view engine", "handlebars");
    //return app;
}