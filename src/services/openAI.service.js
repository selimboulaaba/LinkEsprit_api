const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = 'AIzaSyDI8bckvkvkEpu6A5lJvO_MjgwzLshBnyU';
const genAI = new GoogleGenerativeAI( apiKey );

async function generateChatResponse(numberOfQuestions,topic,difficulty,name) {
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const message = "generate for me a json of "+numberOfQuestions+" question about "+topic+" and assign it to category with difficulty "+difficulty+" and name it in schema "+name+" that matches this model const mongoose = require('mongoose')\n\n\nconst quizSchema = new mongoose.Schema({\n   createdBy: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: 'User',  // Name of the referenced model\n    required: true,\n    },\n    name:{\n        type: String,\n        required: true,\n    },\n    category: {\n        type: String,\n        required: true,\n        },\n    quiz: [\n        {question: {\n            type: String,\n            required: true,\n            },\n        answers: [{\n            type: String,\n            required: true,  \n          }],\n    \n        correctAnswer: {\n            type: Number,\n            required: true,\n          }}\n    ],\n    quizDate: {\n        type: Date,\n        default:Date.now,\n    }\n\n\n\n \n}, {\n \n  timestamps: true\n})\n\n\nmodule.exports = mongoose.model('Quiz', quizSchema)\n"
    const prompt = message
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = text.replace(/```json\n|```|\\n/g, '');


// Parsing the JSON string into a JavaScript object
const jsonObject = JSON.parse(jsonString);



    return jsonObject;
  }



module.exports = {
    generateChatResponse
};
