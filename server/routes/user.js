const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "hi this is user API enpoint",
  });
});

module.exports = router;
