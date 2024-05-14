const testService = require('../services/test.service');

const list = async (req, res, next) => {
  try {
    const tests = await testService.list();
    res.json(tests);
  } catch (error) {
    console.error('Error while fetching tests:', error.message);
    next(error);
  }
};
const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const test = await testService.getById(id);
    res.json(test);
  } catch (error) {
    console.error('Error while fetching test:', error.message);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const test = await testService.create(req.body);
    res.json(test);
  } catch (error) {
    console.error('Error while creating test:', error.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedtest = await testService.update(id, payload);
    res.json(updatedtest);
  } catch (error) {
    console.error('Error while updating test:', error.message);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedtest = await testService.remove(id);
    res.json(deletedtest);
  } catch (error) {
    console.error('Error while removing test:', error.message);
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
