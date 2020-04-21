const nodemailer = require('nodemailer');

module.exports = {
    send(sender, password, recipient, subject, text){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: sender,
                   pass: password
               }
           });
        
        const mailOptions = {
            from: sender,
            to: recipient,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return console.log(error);
            } else {
              return console.log('Email enviado: ' + info.response);
            }
          });
    }
}