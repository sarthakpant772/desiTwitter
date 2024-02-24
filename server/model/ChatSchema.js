const mongoose = require("mongoose");

// Create a Mongoose schema for a Twitter post
const chatSchema = new mongoose.Schema({
  roomId: "string",
  chat: [
    {
      msg: "string",
      sender: "string",
    },
  ],
});

// Create the Twitter Post model
const TwitterPost = mongoose.model("chatSchema", chatSchema);

// Export the model to be used in other parts of the application
module.exports = TwitterPost;
