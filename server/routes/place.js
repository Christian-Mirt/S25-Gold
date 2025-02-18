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
                    message: "Total number of places retrieved successfully",
                    data: result[0].tp,
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

place.get("/reviews", (req, res) => {
    const { place_id } = req.query; // Extract data from query parameters

    connection.execute(
        "SELECT r.*, u.first_name, u.last_name FROM reviews r LEFT JOIN user_information u ON r.user_id = u.user_id WHERE place_id = ?",
        [place_id],
        function (err, result) {
            if (err) {
                res.json(err.message + 'placeId = ' + place_id);
            } else {
                res.json({
                    status: 200,
                    message: "Places reviews retrieved successfully",
                    data: result,
                });
            }
        }
    );
});

export default place;