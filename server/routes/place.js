import { Router } from "express";
import { connection } from "../database/database.js";
const place = Router();

place.get("/tps", (req, res) => {
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
                    data: result,
                });
            }
        }
    );
});

place.get("/catalogs", (req, res) => {
    connection.execute(
        "SELECT * FROM places",
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