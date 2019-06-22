var jwt = require("jsonwebtoken");
const user = require('../database/user');
const USER = user.model;
var rols = {
  verifytoken: function (req, res, next) {
    var token = req.headers["authorization"];
    if(token == null) {
      res.status(300).json({"msn": "Error no tienes accesos"});
      return;
    }
    jwt.verify(token, "password", async(err, auth) => {
      if(err) {
        res.status(300).json({"msn": "Token inválido"});
        return;
      }
      var users = await USER.find({email: auth.name});
      var roles = users[0].roles;
      if(roles == null) {
        res.status(300).json({"msn": "No cuenta con permisos"});
        return;
      }
      for(var i = 0; i < roles.length; i++) {
        if(roles[i] == "list" && req["method"] == "GET" && req["url"].match(/\/user/g) != null) {
          next();
          return;
        }
        if(roles[i] == "delete" && req["method"] == "DELETE" && req["url"].match(/\/user/g) != null) {
          next();
          return;
        }
        if(roles[i] == "patch" && req["method"] == "PATCH" && req["url"].match(/\/user/g) != null) {
          next();
          return;
        }
      }
      //res.status(200).json(auth);
      //roles
      //return;
      //next();
      res.status(200).json({msn: "El usuario no cuenta con el permiso para este servicio"});
    });
  }
}

module.exports = rols;
