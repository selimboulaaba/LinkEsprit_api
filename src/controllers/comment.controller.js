const commentService = require('../services/comment.service');

async function list(req, res, next) {
  try {
      res.json(await commentService.list());
  } catch (err) {
      console.error(`Error while getting comment`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await commentService.create(req.body));
  } catch (err) {
    console.error(`Error while creating a comment`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await commentService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating a comment`, err.message);
    next(err);
  }
}

  async function remove(req, res, next) {
    try {
      res.json(await commentService.delete(req.params.id));
    } catch (err) {
      console.error(`Error while deleting a comment`, err.message);
      next(err);
    }
  }

  async function getCommentsByPublicationId(req, res, next) {
    try {
      res.json(await commentService.getCommentsByPublicationId(req.params.id));
    } catch (err) {
      console.error(`Error while getting comments by publication id`, err.message);
      next(err);
    }
  }

module.exports = {
  list,
  create,
  update,
  remove,
  getCommentsByPublicationId
}; 