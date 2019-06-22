const mongoose = require("./connect");
var USERSCHEMA = {
  nombre:     String,
  email:      String,
  contraseña: String,
  register:   Date,
  roles:      Array,
}

const USER = mongoose.model("user", USERSCHEMA);
module.exports = {model: USER, schema: USERSCHEMA};
