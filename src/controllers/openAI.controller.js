const { generateChatResponse } = require('../services/openAI.service');
const quizService = require('../services/quiz.service');

async function handleChatRequest(req, res, next) {
    const { numberOfQuestions } = req.body;
    const { topic } = req.body;
    const { difficulty } = req.body;
    const { name } = req.body;
    const { createdBy } = req.body;

    try {
        const reply = await generateChatResponse(numberOfQuestions,topic,difficulty,name);
        reply.createdBy = createdBy;  
        reply.category = topic;
        reply.name = name;
       
       const response= await quizService.create(reply); 
       


        res.json(reply);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
}

module.exports = {
    handleChatRequest
};
