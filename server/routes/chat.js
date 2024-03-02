const express = require("express");
const { insertMsg, getMsgOfSepcificRoom } = require("../controller/chat");
const auth = require("../middleware/auth");
const router = express.Router();

router.put("/sendmsg", auth, insertMsg);
router.post("/getSms", auth, getMsgOfSepcificRoom);
module.exports = router;
