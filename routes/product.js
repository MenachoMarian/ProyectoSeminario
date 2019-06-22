var express = require('express');
var router = express.Router();

const product = require('../database/product');
const PRODUCT = product.model;
const PRODUCTSCHEMA = product.schema;
var valid = require("../utils/valid");

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post("/product", async(req, res, next) => {
  var params = req.body;
  params["register"] = new Date();
  if(!valid.checkParams(PRODUCTSCHEMA, params)){
    res.status(300).json({
      msn: "Parámetros incorrectos"
    });
    return;
  }

  if(!valid.checkPrice(params.precio)){
    res.status(300).json({
      msn: "Precio inválido"
    });
    return;
  }

  var product = new PRODUCT(params);
  var result = await product.save();
  res.status(200).json(result);
});

router.get("/product",async(req,res, next) => {
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
  var list = await PRODUCT.find(filter).limit(limit).sort({_id: order}).skip(skip);
  res.status(200).json(list);
});

router.put("/product", async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }
  params["register"] = new Date();
  if(!valid.checkParams(PRODUCTSCHEMA, params)){
    res.status(300).json({
      msn: "Parámetros incorrectos"
    });
    return;
  }
  if(!valid.checkPrice(params.precio)){
    res.status(300).json({
      msn: "Precio inválido"
    });
    return;
  }
  delete params.register;
  var result = await PRODUCT.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.patch("/product", async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }
  if(params.precio != null && !valid.checkPrice(params.precio)){
    res.status(300).json({
      msn: "Precio incorrecto"
    });
    return;
  }
  var result = await PRODUCT.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.delete("/product", async(req,res) => {
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }
  var result = await PRODUCT.remove({_id: id});
  res.status(200).json(result);
});

module.exports = router;
