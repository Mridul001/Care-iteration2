


var express = require("express"),
    router = express.Router(),
    Cci = require("../models/cci2.js"),
    Child = require("../models/child.js"),
    attendance = require("../models/attendance.js");

    
// CCI Registration
router.get('/addCci', function (req, res) {
  res.render("addCci.ejs");
});

// CCi details Page GET Request
router.get('/cciInfo/:district', function (req, res) {

  Cci.find({"cci_address.district": req.params.district}, function (err, allCci) {
    if (err) {
      console.log(err);
    }
    else 
    {
      Child.find({}, function (err, child) {
        if(err)
        {
          console.log(error);
        }
        else
        {
          res.render('cciInfo.ejs', { cci: allCci, child: child });
        }
      });
    }
  });
});



// ADD CCI POST Request

router.post('/addCci', function (req, res) {

  // variables for the logic of cci_id 
  let distname = req.body.district;
  distname = distname.substring(0, 3);
  // console.log(distname);
  let cciname = req.body.name;
  cciname = cciname.charAt(0, 3);
  let ID = "";

  // This function finds the latest cci added and return its count value which is udes to make CCI-ID

  Cci.findOne({ "cci_address.district": req.body.district }, 'cci_name count')
    .sort('-count')
    .exec(function (err, latest) {// latest  cci  count
      if (err) {
        console.log(err);
      }
      else {
        console.log(latest.count);
        let count = latest.count;
        count++;
        console.log(count); // This count means the number of CCI already in the district.
        // Logic for the cci_id

        ID = distname.concat(cciname, count); // concatinating for makin CCIID.
        console.log(ID);

        // NOw This below function is kept under the findOne function's else stetement b.coz keeping it outside creates a problem cci count calculate hota rhta h background me aur cci.create function chl jaata hai -- result ki cci ki field khaali reh jaaati hai...   :)

        // To create the document in database
        Cci.create(
          {
            count: count,
            cci_id: ID,
            cci_name: req.body.name,
            cci_HeadName: {
              fname: req.body.fname,
              lname: req.body.lname,
            },
            cci_HeadID: req.body.cci_HeadID,
            cci_address: {
              address: req.body.address,
              district: req.body.district,
              state: req.body.state
            },
            contact_Info: {
              contact_no: req.body.contact_no,
              email: req.body.email
            }
          },
          function (err, Cci) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(Cci); // console.log details registered of the new CCi
            }
          }
        );

      }
      let Cciname = req.body.name;
      res.redirect('/ccisuccess/' + ID + '/' + Cciname);//Cciname and ID will be used in success page.
    });


});

//For the success page.
router.get('/ccisuccess/:id/:name', function (req, res) {
  res.render("cciregsuccess.ejs", { id: req.params.id, name: req.params.name}
  );
});



// I did this to create first document in attendance collection. 
// router.post('/createTest', function(req, res){
//   attendance.create(
//     {
//       C_Id: "Sample",

//       name:"Sample",
      
//       cci_id: "Sample",
      
//       Present:"true"
//     },
    
//     function(err, created){
//     if(err)
//     {
//       console.log(err);
//     }
//     else
//     {
//       console.log(created);
//     }
//   });
// });



// this is the request when we click the button of attendance details on CCI INFO page.
router.get('/attendance/:cciId/:cciname', function(req, res){
  let cciid = req.params.cciId;
  // console.log(cciid);
  attendance.find({cci_id: req.params.cciId  }, function(err, allchild){
    if(err){
      console.log(err);
    }
    else
    {
      console.log(allchild);
      res.render('attendance.ejs', {child: allchild , cci_name:req.params.cciname}); 
      // Here we are passing the child and cci information for ejs page 
    }
  });

});

// this requst is just for testing . No use in the web app functioning. 
router.get('/getdetails', function(req, res){
  attendance.find({}, function(err, data){
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.send(data);
    }
  });
});

module.exports = router;