import { Router } from "express";
import { connection } from "../database/database.js";
const user = Router();

user.post("/", (req, res) => {
    connection.execute(
        "select * from user_information where user_id=?",
        [req.body.id],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                console.log(result);
                res.json({
                    status: 200,
                    message: "Response from user get api",
                    data: result,
                });
            }
        });
});

export default user;