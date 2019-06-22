var express = require('express');
const user = require('../database/user');
const USER = user.model;
const USERSCHEMA = user.schema;
var valid = require("../utils/valid");
var router = express.Router();

var jwt = require("jsonwebtoken");
var rols = require("../security/checkpermissions");
var verifytoken = rols.verifytoken;



//LOGIN
router.post("/login", async(req, res, next) => {
  var params = req.body;
  if(!valid.checkParams({"email": String, "contraseña": String}, params)){
    res.status(300).json({
      msn: "Parámetros inválidos"
    });
    return;
  }

  var docs = await USER.find({email: params.email, contraseña: params.contraseña});
  if (docs.length == 0) {
    res.status(300).json({msn: "Error, usuario no registrado"});
    return;
  }
  if (docs.length == 1){
    jwt.sign({name: params.email, password: params.contraseña}, "password",(err,token) => {
      if(err){
        res.status(300).json({msn: "Error dentro del jwt"});
      }
      res.status(200).json({token: token});
    });
    return;
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    msn: "Bienvenido  al proyecto de seminario"
  })
});
 //PARTE DE USUARIO:
router.post('/user', async(req, res) => {
  var params = req.body;
  params["register"] = new Date();
  params["roles"] = ["list"];
  if(!valid.checkParams(USERSCHEMA, params)){
    res.status(300).json({
      msn: "Parámetros incorrectos"
    });
    return;
  }
  if(!valid.checkEmail(params.email)){
    res.status(300).json({
      msn: "E-mail incorrecto"
    });
    return;
  }

  var user = new USER(params);
  var result = await user.save();
  res.status(200).json(result);
});

router.get('/user', verifytoken,async(req,res, next) => {
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
  var list = await USER.find(filter).limit(limit).sort({_id: order}).skip(skip);
  res.status(200).json(list);
});

router.put('/user', async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introduzca ID"
    });
    return;
  }
  params["register"] = new Date();
  if(!valid.checkParams(USERSCHEMA, params)){
    res.status(300).json({
      msn: "Parámetros incorrectos"
    });
    return;
  }
  if(!valid.checkEmail(params.email)){
    res.status(300).json({
      msn: "E-mail incorrecto"
    });
    return;
  }
  delete params.register;
  var result = await USER.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.patch('/user', async(req, res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introdusca ID"
    });
    return;
  }
  if(params.email != null && !valid.checkEmail(params.email)){
    res.status(300).json({
      msn: "E-mail incorrecto"
    });
    return;
  }
  var result = await USER.findOneAndUpdate({_id: id},params);
  res.status(200).json(result);
});

router.delete('/user', async(req,res) => {
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "Introdusca ID"
    });
    return;
  }
  var result = await USER.remove({_id: id});
  res.status(200).json(result);
});

module.exports = router;
