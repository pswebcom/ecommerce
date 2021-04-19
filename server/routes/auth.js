const express = require("express");
const router = express.Router();

//middleware

const { authCheck } = require("../middlewares/auth");
const { adminCheck } = require("../middlewares/auth");

const {
  createOrUpdateUserController,
  currentUserController,
} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUserController);
router.post("/current-user", authCheck, currentUserController);

//two layer security
router.post("/current-admin", authCheck, adminCheck, currentUserController);

module.exports = router;
