const multer = require('multer');

// configure disk storage for files handled by multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// configure file extension filter for uploads
const imageFilter = function (req, file, cb) {
    // lets return if there's no file set..
    if (file.originalname == null) {
        cb(null, false);
        return;
    }
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    } else {
        cb(new Error("OnlyImageFilesAllowed"), false);
    }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;