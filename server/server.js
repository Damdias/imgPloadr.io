const express = require("express");
const configure = require("./configure");
const path = require("path");
let app = express();


app.set("port", process.env.PORT || 3300);
app.set("Views",   path.join(__dirname,"../views"));
// app.use((req, res, next)=>{
//  console.log(req);
//     next();
// });
 
configure(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found!');
    err.status = 404;
    next(err);
  });
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error',{msg:err});
  });
  
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}.`);
});