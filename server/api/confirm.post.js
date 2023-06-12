import emailService from './services/email.js';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const url = getRequestURL(event).href;

        const result = await emailService.sendConfirmation(body, url);

        return { ...result };
    } catch (error) {
        return { message: error.message, error: true};
    }
});
