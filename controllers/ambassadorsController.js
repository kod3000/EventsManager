// fancy way of saying admin user
const Ambassador = require('../models/adminUsers.js');

class AmbassadorsService {

    static assign(obj) {
        // all this does is creates a admin user..
        var tmpString = obj.body.username.trim().toLowerCase();
        const delegate = {username: tmpString, password:obj.body.password.trim() };
        const ambassador = new Ambassador(delegate);
        ambassador.setPassword(obj.body.password.trim());
        return ambassador.save();
    }

    static list() {
        return Ambassador.find({})
            .then((delegate) => {
                return delegate;
            });
    }
    static delete(id) {
        return Ambassador.deleteOne({_id: id})
            .then((obj) => {
                //removed
                return obj;
            })
          }
}

module.exports.AmbassadorsService = AmbassadorsService;
