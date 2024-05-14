
const messageService = require('../services/message.service');


async function getMessages(req, res, next) {
   
    const id = req.params.id;
    
    try {
        const { messages } =await messageService.getMessages({chatroomId:id});
    
    res.json({ messages });
    } catch (err) {
      console.error(`Error while getting comments by publication id`, err.message);
      next(err);
    }
  }
module.exports = {
    getMessages
  }; 
