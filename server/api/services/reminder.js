import { createDecipheriv } from 'crypto';

const fieldsMapping = ['email', 'day', 'month', 'year', 'daysBefore', 'text'];

const decrypt = (encrypted) => {
    try {
        const { CRYPTO_ENC_KEY, CRYPTO_IV } = useRuntimeConfig();
        const decipher = createDecipheriv('aes-256-cbc', CRYPTO_ENC_KEY, CRYPTO_IV);
        const decrypted = decipher.update(encrypted, 'base64', 'utf8');

        return (decrypted + decipher.final('utf8'));
    } catch (error) {
        console.log(error);
        return null;
    }
}

const isTimestampValid = (timestamp) => {
    const nowTs = Date.now();
    const ONE_HOUR_IN_MILISEC = 1000 * 60 * 60;

    if (nowTs - timestamp > ONE_HOUR_IN_MILISEC) {
        return false;
    }

    return true;
}

const create = async (context) => {
    const client = await db();
    console.log('CREATE');
    const fieldsData = decrypt(decodeURIComponent(context.params)).split('|');
    console.log('1111');

    if (!fieldsData) {
        console.log('NO FIELDS DATA');
        return;
    }
    console.log('2222');

    if (!isTimestampValid(context.ts)) {
        console.log('NOT VALID TIMESTAMP');
        return;
    }
    console.log('33333');

    const reminderData = fieldsMapping.reduce((acc, item, idx) => {
        if (fieldsData[idx] !== 'undefined' && idx !== 0) {
            acc[item] = fieldsData[idx];
        }
        return acc;
    }, {});
    console.log('4444');

    console.log({reminderData});

    const result = await client.createOrUpdate(fieldsData[0], reminderData);
    console.log('RESULT: ', { result });

    return {
        result,
        message: 'ok'
    }
};

export default {
    create
}