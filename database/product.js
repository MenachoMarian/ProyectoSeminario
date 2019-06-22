const mongoose = require("./connect");
var PRODUCTSCHEMA = {
  nombre:      String,
  precio:      Number,
  categoria:   String,
  descripcion: String,
  register:    Date,
}

const PRODUCT = mongoose.model("product", PRODUCTSCHEMA);
module.exports = {model: PRODUCT, schema: PRODUCTSCHEMA};
