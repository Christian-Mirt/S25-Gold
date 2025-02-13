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

user.get("/ping-render", (req, res) => {
    connection.execute(
        "select 1",
        [],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "Successfully pinged render",
                });
            }
        }
    );
});

user.post("/signUp", (req, res) => {
    connection.execute(
        "INSERT INTO user_information (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
        [req.body.first_name, req.body.last_name, req.body.email, req.body.password],
        function (err, result) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({
                    status: 201,
                    message: "User signed up successfully",
                    userId: result.insertId,
                });
            }
        }
    );
});

user.post("/signIn", (req, res) => {
    connection.execute(
        "SELECT first_name, password from user_information WHERE first_name = ? AND password = ?",
        [req.body.first_name, req.body.password],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "Successfully logged in",
                    data: result,
                });
            }
        }
    );
});

export default user;