import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import user from "./routes/user.js";
import place from "./routes/place.js"
const app = express();
const port = 8080;

const myLogger = function (req, res, next) {
    console.log("Calling Api");
    next();
    console.log("Api calling has done");
}

app.use(myLogger);
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type']
}));

app.use('/user', user);

app.use('/place', place);

app.use(session({
    secret: "0xZwP44QiUeeWjjq3f39",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

export default app;