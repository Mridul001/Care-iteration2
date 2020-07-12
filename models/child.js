var mongoose = require("mongoose");

var ChildSchema = new mongoose.Schema({
    fname        : String,
    lname        : String,
    C_Id        : String,
    age         : Number,
    cci_name    : String,
    cci_id      : String,

    reg_date    : {type : Date},
    gender      : String,
    witness     : String
});

module.exports = mongoose.model("Child", ChildSchema);

