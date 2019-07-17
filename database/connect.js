const mongoose = require("mongoose");
mongoose.connect("mongodb://172.18.0.2:27017/proyecto");
module.exports = mongoose;
