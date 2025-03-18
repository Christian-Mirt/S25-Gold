import 'dotenv/config';
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.DB_HOST,       
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 3, 
    queueLimit: 0 
});

export { pool };
