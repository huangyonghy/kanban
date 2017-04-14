/**
 * Created by HuangY on 2017/3/2.
 */

var nodemailer = require('nodemailer');

var option = {
    host: 'smtp.sina.com',
    auth: {
        user: 'nustanuclear@sina.com',
        pass: 'nustar568054159'
    }
};

var transporter = nodemailer.createTransport(option);

exports.sendEmail = function (userName, email, contents, callback) {
    transporter.sendMail({
        from: 'arieshaha@sina.com',
        to: email, //'yhuang@nustarnuclear.com',
        subject: 'hello ' + userName,
        text: contents, //'hello world!'
        attachments: [
            {   // use URL as an attachment
                filename: 'license.txt',
                path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
            },
        ]
    }, callback);
};