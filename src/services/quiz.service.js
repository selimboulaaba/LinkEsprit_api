const quizModel = require("../models/quiz.model");

exports.list = async () => {
    const quiz = await quizModel.find().populate(['createdBy']);;
  
    return {
      quiz,
      quizNB: quiz.length,
    };
  };
  exports.getById = async (id) => {
    const quiz = await quizModel.findById(id);
    return quiz;
  };
  
  exports.create = async (body) => {
    const quiz = await quizModel.create(body);
  
    return quiz;
  };
  
  exports.update = async (id, payload) => {
    const updatedquiz = await quizModel.findByIdAndUpdate(id, { $set: payload }, { new: true })
    return updatedquiz;
  };
  
  exports.remove = async (id) => {
      const deletedquiz = await quizModel.findByIdAndDelete(id);
      if (!deletedquiz) {
        throw new Error('quiz not found');
      }
      return deletedquiz;
    };