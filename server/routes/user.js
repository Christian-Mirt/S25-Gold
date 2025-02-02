import { Router } from "express";
import { connection } from "../database/database.js";
const user = Router();

user.get("/", (req, res) => {
    connection.execute("select * from user_information", function (err, result) {
        if (err) {
            res.json(err.message);
        } else {
            res.json({
                status: 200,
                message: "Response from user get api",
                data: result,
            });
        }
    });
});

user.get("/:id", (req, res) => {
    connection.execute("select * from user_information where user_id=?",
        [req.params.id],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "Response from user get api",
                    data: result,
                });
            }
        });
});

export default user;