// this manages the client database bank
const Client = require('../models/client.js');

class ClientsService {

  static create(obj) {

    var tmpString = obj.body.email.trim().toLowerCase();
    var data = {
      email: tmpString,
      knownName: obj.body.name,
    }
    var client = new Client();
    client.set(data);
    client.setPassword(tmpString);
    return client.save();
  }

  static list() {
    return Client.find({})
      .then((client) => {
        // found
        return client;
      });
  }
  static checkItOut(obj) {
    // checks if the client already exists and logs them in automatically
    var tmpString = obj.body.email.trim().toLowerCase();
    return Client.findOne({
        email: tmpString
      })
      .then((client) => {
        return client;
      });
  }

}

module.exports.ClientsService = ClientsService;
