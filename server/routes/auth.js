const express = require("express");
const router = express.Router();

//middleware

const { authCheck } = require("../middlewares/auth");

const { createOrUpdateUserController } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUserController);

module.exports = router;
