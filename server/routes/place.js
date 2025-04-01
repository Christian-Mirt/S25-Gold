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
        "SELECT r.*, u.first_name, u.last_name, p.url FROM reviews r LEFT JOIN user_information u ON r.user_id = u.user_id LEFT JOIN photos p ON u.user_id=p.user_id WHERE place_id = ?",
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

place.get("/places", (req, res) => {
    const { name } = req.query;
    
    pool.execute(
        "SELECT * FROM places WHERE name LIKE ?",
        [`%${name}%`],
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

place.get("/amenities", (req, res) => {
    const { place_id } = req.query; 

    if (!place_id) {
        return res.status(400).json({ error: "place_id is required" });
    }

    pool.execute(
        "SELECT * FROM amenities WHERE amenity_id = ?",
        [place_id],
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