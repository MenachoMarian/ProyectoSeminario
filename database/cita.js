const mongoose = require("./connect");
var CITASCHEMA = {
  fecha:      Date,
  hora:       String,
  lugar:      String,
  iduser:     String,
  idProduct:  String,
  register:   Date,
}

const CITA = mongoose.model("cita", CITASCHEMA);
module.exports = {model: CITA, schema: CITASCHEMA};
