import { Router } from "express";
import { connection } from "../database/database.js";
const reset = Router();

reset.put("/generateNewPass", (req, res) => {

    connection.execute(
        "update user_information set password=? where email=?",
        [req.body.password, req.body.email],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                if (result.affectedRows > 0) {
                    res.json({
                        status: 200,
                        message: "Created new password",
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

export default reset;