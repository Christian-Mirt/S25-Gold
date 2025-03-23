import { Router } from "express";
import { pool } from "../database/database.js";
const place = Router();

place.get("/tps", (req, res) => {
    pool.execute(
        "SELECT count(*) AS tp FROM places", 
        [], 
        (err, result) => {
            if (err) {
                res.json({ error: err.message });
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
    pool.execute(
        "SELECT * FROM places",
        [], 
        (err, result) => {
            if (err) {
                res.json({ error: err.message });
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
    const { place_id } = req.query; 

    pool.execute(
        "SELECT r.*, u.first_name, u.last_name, u.profile_photo FROM reviews r LEFT JOIN user_information u ON r.user_id = u.user_id WHERE place_id = ?",
        [place_id],
        (err, result) => {
            if (err) {
                res.json({ error: err.message + ' placeId = ' + place_id });
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

place.post("/reviews", (req, res) => {
    const { place_id, user_id, num_stars, comment } = req.body;

    const date = new Date().toISOString().split('T')[0];

    pool.execute(
        "INSERT INTO reviews (place_id, user_id, num_stars, comment, date) VALUES (?, ?, ?, ?, ?)",
        [place_id, user_id, num_stars, comment, date],
        (err, result) => {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json({
                    status: 200,
                    message: "Review submitted successfully",
                    data: result,
                });
            }
        }
    );
});

place.get("/amenities", (req, res) => {
    const { place_id } = req.query; 

    pool.execute(
        "SELECT * FROM amenities WHERE place_id = ?",
        (err, result) => {
            if (err) {
                res.json({ error: err.message + ' placeId = ' + place_id });
            } else {
                res.json({
                    status: 200,
                    message: "Places amenities retrieved successfully",
                    data: result,
                });
            }
        }
    );
});

export default place;
