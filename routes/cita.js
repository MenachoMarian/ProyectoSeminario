var express = require('express');
var router = express.Router();

const cita = require('../database/cita');
const CITA = cita.model;
const CITASCHEMA = cita.schema;
var valid = require("../utils/valid");

router.post("/cita", async(req, res, next) => {
  var params = req.body;
  params["register"] = new Date();
  if(!valid.checkParams(CITASCHEMA, params)){
    res.status(300).json({
      msn: "Parámetros incorrectos"
    });
    return;
  }

  var cita = new CITA(params);
  var result = await cita.save();
  res.status(200).json(result);
});

router.get("/cita", async(req,res, next) => {
  var params = req.query;
  var limit = 100;
  if(params.limit != null){
    limit = parseInt(params.limit);
  }
  var order = -1;
  if(params.sort != null){
    if(params.sort == "desc") {
      order = -1;
    }else if (params.sort == "asc") {
      order = 1;
    }
  }
  var filter = {};
  if(params.id != null){
    filter= {_id: params.id};
    }
  var skip = 0;
  if (params.skip != null) {
    skip = parseInt(params.skip);
  }
  var list = await CITA.find(filter).limit(limit).sort({_id: order}).skip(skip);
  res.status(200).json(list);
});

router.put("/cita", async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }
  params["register"] = new Date();
  if(!valid.checkParams(CITASCHEMA, params)){
    res.status(300).json({
      msn: "Parámetros incórrectos"
    });
    return;
  }
  delete params.register;
  var result = await CITA.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.patch("/cita", async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }

  var result = await CITA.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.delete("/cita", async(req,res) => {
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }
  var result = await CITA.remove({_id: id});
  res.status(200).json(result);
});

module.exports = router;
