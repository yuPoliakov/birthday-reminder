import nodemailer from 'nodemailer';
import { createCipheriv } from 'crypto';

function genereateHash(value) {
    try {
        const { CRYPTO_ENC_KEY, CRYPTO_IV } = useRuntimeConfig();
        const cipher = createCipheriv('aes-256-cbc', CRYPTO_ENC_KEY, CRYPTO_IV);
    
        let encrypted = cipher.update(value, 'utf8', 'base64');
        encrypted += cipher.final('base64');
    
        return encrypted;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const sendConfirmation = async (body, url) => {
    const { emailUser, emailPass, emailService } = useRuntimeConfig();
    const { email, day, month, year, daysBefore, text } = body;
    const timestamp = Date.now();

    var transporter = nodemailer.createTransport({
        service: emailService,
        auth: {
          user: emailUser,
          pass: emailPass
        }
    });

    const hash = genereateHash([email, day, month, year, daysBefore, text].join('|'));
    const encodedHash = encodeURIComponent(hash);
    const confirmedUrl = url.replace('/api', '');
    const link = `${confirmedUrl}?params=${encodedHash}&ts=${timestamp}`;

    var mailOptions = {
        from: 'Birthday Reminder',
        to: email,
        subject: 'Birhtday Reminder confirmation',
        html: `Hey! Please confirm your email by clicking on this link <a href="${link}" target="blank">confirm</a>`
    };

    console.log('EMAIL USER: ', emailUser);
    console.log('LINK: ', link);

    const emailInfo = await transporter.sendMail(mailOptions);

    console.log('Email send: ', emailInfo.messageId);
    console.log('AFTER SEND');


    return {
        ok: true,
    }
}

export default {
    sendConfirmation
}