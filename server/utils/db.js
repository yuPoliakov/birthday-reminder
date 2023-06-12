import configs from '../db/config';

const dbConfig = configs[process.env.DATABASE];

import db from '../db/mongoDB';

db.connect(dbConfig);

export default defineEventHandler((event) => {
    return db;
});