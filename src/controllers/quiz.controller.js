const quizService = require('../services/quiz.service');

const list = async (req, res, next) => {
  try {
    const quizs = await quizService.list();
    res.json(quizs);
  } catch (error) {
    console.error('Error while fetching quizs:', error.message);
    next(error);
  }
};
const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const quiz = await quizService.getById(id);
    res.json(quiz);
  } catch (error) {
    console.error('Error while fetching quiz:', error.message);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const quiz = await quizService.create(req.body);
    res.json(quiz);
  } catch (error) {
    console.error('Error while creating quiz:', error.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedquiz = await quizService.update(id, payload);
    res.json(updatedquiz);
  } catch (error) {
    console.error('Error while updating quiz:', error.message);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedquiz = await quizService.remove(id);
    res.json(deletedquiz);
  } catch (error) {
    console.error('Error while removing quiz:', error.message);
    next(error);
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
