const crypto = require('crypto');

const sendEmail = require('../utils/sendEmail');

module.exports = {
    sendEmailVerifiCode(request, response){
        const { email } = request.body;

        const generatedCode = crypto.randomBytes(2).toString('HEX');

        const sender = 'lucasmvl2003@gmail.com';
        const password = 'lmvllsvl';
        const recipient = email;
        const subject = 'Código de verificação';
        const text = `Seu código de verificação é: ${generatedCode}`;

        sendEmail.send(sender,password,recipient,subject,text);

        return response.json({ generatedCode })
    }
}