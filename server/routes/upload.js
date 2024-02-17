const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadProfilePic, uploadThumbNail } = require("../controller/upload");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/profilePic", auth, uploadProfilePic);
router.post("/thumbnail", auth, uploadThumbNail);

module.exports = router;
