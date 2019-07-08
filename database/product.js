const mongoose = require("./connect");
var PRODUCTSCHEMA = {
  //idusuario:   String,
  nombre:      String,
  precio:      Number,
  stock:       Number,
  categoria:   String,
  descripcion: String,
  register:    Date,
  emailuser:   String,
  estado:      String,
}

const PRODUCT = mongoose.model("product", PRODUCTSCHEMA);
module.exports = {model: PRODUCT, schema: PRODUCTSCHEMA};
