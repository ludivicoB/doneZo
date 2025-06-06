import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkUserQuery, [username, email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    // If user with the same username or email exists, return an error
    if (result.length > 0) {
      return res.json({
        status: "error",
        message: "Username or email already exists",
      });
    }

    // Proceed with hashing the password if no user exists with the same username/email
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password" });

      const sql =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err)
          return res.status(400).json({ message: "Error registering user" });
        res
          .status(201)
          .json({ message: "User registered successfully", status: "success" });
      });
    });
  });
};

export const login = (req, res) => {
  const { identifier, password } = req.body; // Identifier can be email or username

  // Check if user exists by email or username
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query, [identifier, identifier], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Error verifying password" });

      if (!isMatch) {
        return res.json({ status: "error", message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token, status: "success" });
    });
  });
};
