const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({

    host:"smtp-relay.brevo.com",
    port:587,
    secure:false,

    auth : {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD
    }


})



module.exports = transpoter;
