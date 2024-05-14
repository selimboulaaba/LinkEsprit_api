const messageModel = require("../models/message.model");

exports.getMessages = async ({chatroomId}) => {
    
    let messages = await messageModel.find({ chatroom: chatroomId })
    .sort({ messageDate: 1 }) 
   
    
  
    return {messages};
  }