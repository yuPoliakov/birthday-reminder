// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: 'favicon.png' }
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Birthday Reminder. Get a reminder to not forgive you friend\'s birthday' },
            ],
            title: 'Birthday Reminder'
        }
    },
    runtimeConfig: {
        env: 'dev',
        emailUser: process.env.EMAIL_USER,
        emailPass: process.env.EMAIL_PASS,
        emailService: process.env.EMAIL_SERVICE,
        CRYPTO_ENC_KEY: process.env.CRYPTO_ENC_KEY,
        CRYPTO_IV: process.env.CRYPTO_IV,
        DATABASE: process.env.DATABASE
    },
    nitro: {
        preset: 'aws-lambda',
        serveStatic: true
    },
    modules: ['@nuxtjs/tailwindcss']
});
