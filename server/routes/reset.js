import { Router } from "express";
import { connection } from "../database/database.js";
const reset = Router();

reset.put("/generateNewPass", (req, res) =>{
    connection.execute(
        "update user_information set password=? where email=?",
        [req.body.password, req.body.email],
        function (err, result){
            if (err){
                res.json();
            }
            else
            {
                res.json({
                    status: 200,
                    message: "Created New Password",
                    data:result,
                });
            }
        }
    );
});

export default reset;