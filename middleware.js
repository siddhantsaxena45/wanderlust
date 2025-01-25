module.exports.isloggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.locals = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
}
module.exports.savedUrl=(req,res,next)=>{
    if(req.session.locals){
        res.locals.redirect = req.session.locals;
    }
    next();
}