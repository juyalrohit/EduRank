const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Create a platform-independent path
const uploadDir = path.join(__dirname, '../uploads');

// Create the folder if it doesn't exist


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (error, bytes) => {
            if (error) return cb(error);

            const fileName = bytes.toString('hex') + path.extname(file.originalname);
            cb(null, fileName);
        });
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

module.exports = upload;
