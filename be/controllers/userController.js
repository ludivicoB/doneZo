import db from "../db.js";
import bcrypt from "bcryptjs";

export const getUserProfile = (req, res) => {
  const userid = req.user.id;
  db.query("select * from users where id=?", [userid], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting user profile" });
    }
    return res.status(200).json(result);
  });
};

export const changePassword = (req, res) => {
  const userid = req.user.id;
  const { oldpassword, newpassword } = req.body;

  db.query(
    "SELECT password FROM users WHERE id = ?",
    [userid],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error getting user password" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userPassword = result[0].password;

      // ✅ Use bcrypt to compare hashed and plain text password
      bcrypt.compare(oldpassword, userPassword, (err, isMatch) => {
        if (err)
          return res.json({
            error: err.message,
            status: "error",
            message: "Error comparing passwords",
          });

        if (!isMatch) {
          return res.json({
            status: "error",
            message: "Old password is incorrect",
          });
        }

        // ✅ Hash the new password before saving
        bcrypt.hash(newpassword, 10, (err, hashednewpassword) => {
          if (err)
            return res.json({
              status: "error",
              message: "Error hashing password",
              error: err.message,
            });

          db.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashednewpassword, userid],
            (err, result) => {
              if (err) {
                return res.json({ status: "error", message: err.message });
              }

              return res.json({
                status: "success",
                message: "Password successfully updated",
              });
            }
          );
        });
      });
    }
  );
};
