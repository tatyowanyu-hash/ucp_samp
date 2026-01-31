const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===== EDIT DATABASE DISINI =====
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "s281200_gnrp"
});

// ===== API DAFTAR UCP (AUTO ALLOWED) =====
app.post("/ucp", async (req, res) => {
  const { ucp } = req.body;

  if (!ucp)
    return res.json({ success: false, msg: "UCP tidak boleh kosong" });

  if (!/^[A-Z][a-z]+_[A-Z][a-z]+$/.test(ucp))
    return res.json({ success: false, msg: "Format harus First_Last" });

  try {
    await db.execute(
      `INSERT INTO whitelists 
      (ucp, nickadmin, adutyname, verify, recovery, date, discordid, allowed)
      VALUES (?, 'System', 'System', 1, -1, NOW(), NULL, 1)`,
      [ucp]
    );

    res.json({
      success: true,
      msg: "UCP berhasil dibuat & langsung bisa login"
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.json({ success: false, msg: "UCP sudah terdaftar" });
    } else {
      res.json({ success: false, msg: "Server error" });
    }
  }
});

app.listen(3000, () => {
  console.log("UCP API running on port 3000");
});
