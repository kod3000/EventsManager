const Event = require('../models/event.js');

class EventsService {
  static create(obj) {
      const event = new Event(obj);
      return event.save();
  }
  static public() {
      return Event.find({eventType:"Public"})
          .then((event) => {
              // found
              return event;
          });
  }
  static eventNum(id) {
      return Event.findOne({eventNum:id})
          .then((event) => {
              // found
              return event;
          });
  }
  static updateSeats(id, seats, vegans) {

      return Event.findById(id)
          .then((event) => {
              event.set({seatsOccupied:seats, seatsVegatarian:vegans});
              event.save();
              return event;
          });
  }

    static update(id, data) {
        return Event.findById(id)
            .then((event) => {
                event.set(data);
                event.save();
                return event;
            });
    }


    static read(id) {
        return Event.findById(id)
            .then((event) => {
                // found
                return event;
            });
    }

    static list() {
        return Event.find({})
            .then((event) => {
                // found
                return event;
            });
    }

    static delete(id) {
        return Event.deleteOne({
                _id: id
            })
            .then((obj) => {
                //removed
                return obj;
            })
    }
}

module.exports.EventsService = EventsService;
