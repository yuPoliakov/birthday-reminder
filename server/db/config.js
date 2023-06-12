export default {
    mongoose: {
        port: '',
        location: 'mongoose'
    },
    prisma: {},
    mongoDB: {
        location: 'mongoDB',
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        pass: process.env.MONGO_PASS,
        user: process.env.MONGO_USER,
        db: process.env.MONGO_DB
    },
    postgres: {}
}
