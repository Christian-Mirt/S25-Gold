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
                res.json({
                    status: 200,
                    message: "Response from user get api",
                    data: result,
                });
            }
        });
});

user.post("/total", (req, res) => {
    connection.execute(
        "select count(*) as total_users from user_information",
        [],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "Total number of users retrieved successfully",
                    data: result[0].total_users,
                });
            }
        }
    );
});

user.get("/get-total", (req, res) => {
    connection.execute(
        "select count(*) as total_users from user_information",
        [],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "Total number of users retrieved successfully",
                    data: result[0].total_users,
                });
            }
        }
    );
});

export default user;