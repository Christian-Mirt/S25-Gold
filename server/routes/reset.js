import { Router } from "express";
import { pool } from "../database/database.js";
const reset = Router();

user.put("/generateNewPass", (req, res) => {

  pool.execute(
    "UPDATE user_information SET password=? WHERE email=?",
    [req.body.password, req.body.email],
    (err, result) => {
      if (err) {
        res.json(err.message);
      } else {
        if (result.affectedRows > 0) {
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
export default reset;
