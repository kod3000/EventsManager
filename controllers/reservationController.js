const Reserve = require('../models/reserve.js');

class ReservationsService {

  static create(obj) {
    const reserve = new Reserve(obj);
    return reserve.save();
  }
  static readClient(id) {
    return Reserve.find({
        clientId: id
      })
      .then((reserves) => {
        return reserves;
      });
  }
  static getReservation(eventId, userId) {
    return Reserve.findOne({
        eventNum: eventId,
        clientId: userId
      })
      .then((reserves) => {
        // found
        return reserves;
      });
  }
  static update(id, data) {
    return Reserve.findById(id)
      .then((reserve) => {
        reserve.set(data);
        reserve.save();
        return reserve;
      });
  }

  static read(id) {
    return Reserve.findById(id)
      .then((reserve) => {
        // found
        return reserve;
      });
  }

  static list() {
    return Reserve.find({})
      .then((reserve) => {
        // found
        return reserve;
      });
  }

  static delete(id) {
    return Reserve.deleteOne({
        _id: id
      })
      .then((obj) => {
        //removed
        return obj;
      })
  }
}

module.exports.ReservationsService = ReservationsService;
