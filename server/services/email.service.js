const { User } = require('../models/user')
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

const registerEmail = async(userEmail, user) =>{
    try {
        const emailToken = user.generateEmailToken();

        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Chord Mart',
                link: `${process.env.EMAIL_URL}`
            }
        });
        
        let email = {
            body: {
                name: userEmail,
                intro: 'Welcome to Chord Mart! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To verify email, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Verify your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        let emailBody = mailGenerator.generate(email);
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Welcome to Chord Mart",
            html: emailBody
          });

        return true;

    } catch(error) {
        throw error;
    }
}


module.exports = {
    registerEmail
}
