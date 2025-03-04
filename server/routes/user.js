import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, CompareText, HashedPassword, generateRandomPassword } from "../utils/GeneratePassword.js";
import { SendMail } from "../utils/SendMail.js";
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

user.post("/login", (req, res) => {

    connection.execute(
        "select * from user_information where email=?",
        [req.body.email],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                if (result[0]) {
                    if (CompareText(req.body.password, result[0].password) || CompareText(req.body.password, result[0].temp_key)) {
                        res.json({
                            status: 200,
                            message: "User logged in successfully!",
                            data: result,
                        });
                    }
                } else {
                    res.json({
                        status: 401,
                        message: "Wrong username or password",
                    });
                }
            }
        }
    );
});

user.put("/reset-password", (req, res) => {
    const tempKey = generateRandomPassword();

    connection.execute(
        "update user_information set temp_key=? where email=?",
        [tempKey, req.body.email],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                if (result.affectedRows > 0) {
                    const msg = "Thanks for using Productive Places!<br><br>To access your account, please login with this temporary key:<br><br>" + tempKey + "<br><br>Productively,<br>The Productive Places Support Team<br>";
                    SendMail(req.body.email, "Temporary Password", msg);
                    res.json({
                        status: 200,
                        message: "Updated login key, email sent",
                        data: result,
                    });
                } else {
                    res.json({
                        status: 401,
                        message: "No accounts found",
                        data: result,
                    });
                }
            }
        }
    );
});

user.get("/:id", (req, res) => {
    connection.execute(
        "select * from user_information where user_id=?",
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
        }
    );
});

user.delete("/", (req, res) => {
    connection.execute(
        "delete from user_information where user_id=?",
        [req.params.id],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "User deleted successfully",
                });
            }
        }
    );
});

export default user;