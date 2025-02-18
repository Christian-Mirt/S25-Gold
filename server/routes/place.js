import { Router } from "express";
import { connection } from "../database/database.js";
const place = Router();

user.get("/tps", (req, res) => {
    connection.execute(
        "select count(*) as tp from places",
        [],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "Total number of users retrieved successfully",
                    data: result[0].tp,
                });
            }
        }
    );
});

user.get("/catalogs", (req, res) => {
    connection.execute(
        "SELECT name, overall_rating FROM places",
        [],
        function (err, result) {
            if (err) {
                res.json(err.message);
            } else {
                res.json({
                    status: 200,
                    message: "Places retrieved successfully",
                    data: result,
                });
            }
        }
    );
});

export default place;