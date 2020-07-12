var express 	= require("express"),
    router  	= express.Router();
    

router.get("/", function(req, res){
    res.render("landing.ejs");
});

router.get("/loginBtn", function(req, res){
    res.render("loginOption.ejs");
});
    

module.exports = router;