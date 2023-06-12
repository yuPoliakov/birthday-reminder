import reminderService from './services/reminder.js';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log('REMINDER POST');
        if (!body.params) {
            return;
        }

        const result = await reminderService.create(body);

        return { ...result };
    } catch (error) {
        console.log({ error });
        return { message: error.message, error: true};
    }
});
