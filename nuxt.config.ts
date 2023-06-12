// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        env: 'prod',
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
