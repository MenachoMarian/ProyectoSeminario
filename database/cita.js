const mongoose = require("./connect");
var CITASCHEMA = {
  fecha:      String,
  hora:       String,
  //lugar:      String,
  //iduser:     String,
  //idProduct:  String,
  emailuser:  String,
  register:   Date,
}

const CITA = mongoose.model("cita", CITASCHEMA);
module.exports = {model: CITA, schema: CITASCHEMA};
