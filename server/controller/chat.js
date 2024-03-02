const { ConnectionPoolClosedEvent } = require("mongodb");
const Chat = require("../model/ChatSchema");
const UserSchema = require("../model/UserSchema");

const insertMsg = async (req, res) => {
  try {
    const { receiverId, msg } = req.body;
    const author = req.user.id;

    const userData = await UserSchema.findById(author);
    const sortedIds = [userData.userName, receiverId].sort();
    const id = `${sortedIds[0]}thuisasecretgeneratedkey${sortedIds[1]}`;

    const data = await Chat.findOneAndUpdate(
      { roomId: id },
      { $push: { chat: { msg, sender: userData.userName } } },
      { upsert: true, new: true }
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getMsgOfSepcificRoom = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const author = req.user.id;
    console.log(author);
    const userData = await UserSchema.findById(author);
    console.log(userData.userName);
    const sortedIds = [userData.userName, receiverId].sort();
    const id =
      `${sortedIds[0]}` + "thuisasecretgeneratedkey" + `${sortedIds[1]}`;
    console.log(id);
    const getChat = await Chat.findOne({ roomId: id });
    res.status(200).json(getChat);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { insertMsg, getMsgOfSepcificRoom };
