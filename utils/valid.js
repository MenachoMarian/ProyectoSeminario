var valid = {
  checkParams: function(refobj, evalueobj){
    if(Object.keys(refobj).sort().toString() == Object.keys(evalueobj).sort().toString()) {
      return true;
    }
    return false;
  },

  checkEmail: function(email) {
    var exp = /^\w{1,}@\w{1,}[.]\w{2,3}$/g
    if(email.match(exp) == null){
      return false;
    }
    return true;
  },

  checkPrice: function(price) {
    var exp = /\w{1,}[0-9.]/g
    if (price.match(exp) == null) {
      return false;
    }
    return true;
  }

};

module.exports = valid;
