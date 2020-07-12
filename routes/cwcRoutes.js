var express 	= require("express"),
    router  	= express.Router(),
    Child = require("../models/child"),
    Cci = require("../models/cci2.js");

    
router.get("/cwc", function(req, res){
    res.render("cwclanding.ejs");
});


router.get('/addChild/:district',function(req, res){

    Cci.find({}, function(err, allCci){
      if(err){
        console.log(err);
      }
      else{
        res.render("addChild.ejs",{district:req.params.district, cci: allCci});
      }
    });
    
});



//Eligibility Pool of District
router.get('/new', function (req, res) {
    res.render("table.ejs");
  });


//  this is (**)
router.get('/registered/:id/:name',function(req, res){
    res.render("success.ejs", {
        cciname : req.params.name,
        C_Id : req.params.id       
    });
});



router.post('/addChild', function(req, res){
    let C_Id = (req.body.cci_id + req.body.name +req.body.gender);
    Child.create(
      {
        fname : req.body.fname,
        lname : req.body.lname,
        C_Id : C_Id,
        age : req.body.age,
        cci_name : req.body.cci_name,
        cci_id : req.body.cci_id,
        reg_date : req.body.reg_date,
        gender : req.body.gender,
        witness  : req.body.witness 
      },
        
      function(err, child)
      {
        if(err)
          {console.log(err);}
          else {
            console.log(child);// This prints the the whoole info filled in form in Terminal.
          }
          
      })
        
  let cciname = req.body.cci_name;
  res.redirect('/registered/'+C_Id+'/'+cciname);// Here we are passing the ChildId in the request body and in above ->(**)  we will do req.body.params to get that name and print in the success ejs page.
  });
  


router.get('/details',function(req, res){
    // var date=  new Date( parseInt((new Date().getTime - 172800000),10));
    //in below,   logic is to get those values which are older than three months, $lt --> less than.
    //new Date().getTime() --> this gives the time elapsed in ms from a date (a specific date of mongoDB ) and 17280000000000 is 3 months in milliseconds. then this difference is converted into  date format by new Date(____).
    Child.find({reg_date : {$lt : new Date(new Date().getTime() - 17280000000) }}, function(err, allChild){
        if(err){
            console.log(err);
        }else {
        //  res.set('Content-Type', 'text/html');
        //  console.log(date.toString());
            res.render("table.ejs",{Child :allChild});
        }
    });      
});




module.exports = router;