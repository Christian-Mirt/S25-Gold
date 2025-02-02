import { Router } from "express";
import { connection } from "../database/database.js";
const user = Router();

user.get('/', (req, res) => {
    res.json({
        'status': 200,
        'message': "Response from get api!"
    });
})



export default user;