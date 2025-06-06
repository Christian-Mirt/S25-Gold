import { Router } from "express";
import { pool } from "../database/database.js";
import { ComparePasword, CompareText, HashedPassword, generateRandomPassword } from "../utils/GeneratePassword.js";
import { SendMail } from "../utils/SendMail.js";
const user = Router();

user.post("/", (req, res) => {
  pool.execute(
    "SELECT * FROM user_information WHERE user_id=?",
    [req.body.id],  
    (err, result) => {
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

user.post("/total", (req, res) => {
  pool.execute(
    "SELECT count(*) AS total_users FROM user_information",
    [], 
    (err, result) => {
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
  pool.execute(
    "SELECT 1",
    [],
    (err, result) => {
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
  pool.execute(
    "INSERT INTO user_information (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    [req.body.first_name, req.body.last_name, req.body.email, req.body.password],  // This is for user signup
    (err, result) => {
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
  pool.execute(
      "SELECT * FROM user_information WHERE email=?",
      [req.body.email],
      (err, result) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }

          if (!result[0]) {
              return res.status(401).json({ message: "Wrong username or password" });
          }

          const passwordMatches = CompareText(req.body.password, result[0].password);
          const tempKeyMatches = CompareText(req.body.password, result[0].temp_key);

          if (passwordMatches || tempKeyMatches) {
              return res.status(200).json({
                  status: 200,
                  message: "User logged in successfully!",
                  data: result,
              });
          }

          return res.status(401).json({ message: "Wrong username or password" });
      }
  );
});


user.put("/reset-password", (req, res) => {
  const tempKey = generateRandomPassword();

  pool.execute(
    "UPDATE user_information SET temp_key=? WHERE email=?",
    [tempKey, req.body.email],
    (err, result) => {
      if (err) {
        res.json(err.message);
      } else {
        if (result.affectedRows > 0) {
          const msg = `Thanks for using Productive Places!<br><br>To access your account, please login with this temporary key:<br><br>${tempKey}<br><br>Productively,<br>The Productive Places Support Team<br>`;
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
  pool.execute(
    "SELECT * FROM user_information WHERE user_id=?",
    [req.params.id], 
    (err, result) => {
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
  pool.execute(
    "DELETE FROM user_information WHERE user_id=?",
    [req.body.id], 
    (err, result) => {
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
