const mongoose = require("mongoose");

const chatroomModel = require("../models/chatroom.model");

async function createChatroom(req, res) {
  const { name } = req.body;

  try {
    const chatroomExists = await chatroomModel.findOne({ name });

    if (chatroomExists) {
      throw new Error("Chatroom with that name already exists!");
    }

    const chatroom = new chatroomModel({
      name,
      participants: [req.body.id, req.body.userId],
    });

    await chatroom.save();

    res.json({
      message: "Chatroom created!",
    });
  } catch (err) {
    // Handle the error here
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllChatrooms (req, res)  {
  const chatrooms = await chatroomModel.find({});

  res.json(chatrooms);
};
async function getChatroomById (req, res)  {
  const id = req.params.id;
  const chatrooms = await chatroomModel.find({participants:id});
 

  res.json(chatrooms);
};

module.exports = {
    createChatroom ,
    getAllChatrooms,
    getChatroomById
  }; 