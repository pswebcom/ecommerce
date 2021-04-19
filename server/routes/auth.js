const express = require("express");
const router = express.Router();

//middleware

const { authCheck } = require("../middlewares/auth");
<<<<<<< HEAD
const { adminCheck } = require("../middlewares/auth");

const {
  createOrUpdateUserController,
  currentUserController,
} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUserController);
router.post("/current-user", authCheck, currentUserController);

//two layer security
router.post("/current-admin", authCheck, adminCheck, currentUserController);
=======

const { createOrUpdateUserController } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUserController);
>>>>>>> 229820b0c031893b8f44ffb866a618a853e90c64

module.exports = router;
