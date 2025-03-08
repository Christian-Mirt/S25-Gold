import { Router } from "express";
import { pool } from "../database/database.js";
const reset = Router();

reset.put("/generateNewPass", (req, res) => {
    const { password, email } = req.body;

    pool.query(
        "UPDATE user_information SET password=? WHERE email=?",
        [password, email],
        (err, result) => {
            if (err) {



            } else {

                if (result.affectedRows > 0) {
                    return res.json({
                        status: 200,
                        message: "Password updated successfully",
                        data: result,
                    })

                    return res.status(404).json({
                        status: 404,
                        message: "No accounts found",
                        data: result,
                    });
                }
            }
        }
    );
});

export default reset;
