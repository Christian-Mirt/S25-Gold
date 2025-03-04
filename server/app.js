import bodyParser from "body-parser";
import { connection } from './database/database.js';
import cors from "cors";
import express from "express";
import session from "express-session";
import MySQLStore from 'express-mysql-session';
import user from "./routes/user.js";
import place from "./routes/place.js"
const app = express();
const port = 8080;

const MySQLStoreSession = MySQLStore(session);
const sessionStore = new MySQLStoreSession({}, connection);

const myLogger = function (req, res, next) {
    console.log("Calling Api");
    next();
    console.log("Api calling has done");
}

app.use(myLogger);
app.use(bodyParser.json());

app.use(cors({
    origin: "https://productive-places.web.app",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}));

app.use(session({
    secret: "0xZwP44QiUeeWjjq3f39",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 86400000,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }
}));

app.use('/user', user);

app.use('/place', place);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

export default app;