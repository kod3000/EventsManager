// determine if the user is admin or client..
const welcome = {
  userCheck: function (req, res, next){
    var tmpKey = req.body.name;
    var unlockKey = tmpKey.slice(0, 6);
    var passKey = tmpKey.slice(6, tmpKey.length);
    if(unlockKey == "admin/"){
        res.redirect('/embassy/'+passKey);
    }else{
        res.redirect('/nation/open/'+req.body.name);
    }
  },

};

module.exports = welcome;
