const publicationService = require('../services/publication.service');

const list = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1; // Extract page number from query parameter, default to 1 if not provided
    const pageSize = 1; // Number of publications per page
    const startIndex = (page - 1) * pageSize;

    // Fetch the subset of publications for the requested page
    const { publications, totalCount } = await publicationService.list({ skip: startIndex, limit: pageSize, userId: id });

    // Calculate hasMore based on the current page and totalCount
    const hasMore = (startIndex + publications.length) < totalCount;

    res.json({ publications, hasMore });
  } catch (error) {
    console.error('Error while fetching publications:', error.message);
    next(error);
  }
};



const create = async (req, res, next) => {
  try {
    const publication = await publicationService.create(req.body);
    res.json(publication);
  } catch (error) {
    console.error('Error while creating publication:', error.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedPublication = await publicationService.update(id, payload);
    res.json(updatedPublication);
  } catch (error) {
    console.error('Error while updating publication:', error.message);
    next(error);
  }
};

const updateLikes = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedPublication = await publicationService.updateLikes(id, payload);
    res.json(updatedPublication);
  } catch (error) {
    console.error('Error while updating publication:', error.message);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPublication = await publicationService.remove(id);
    res.json(deletedPublication);
  } catch (error) {
    console.error('Error while removing publication:', error.message);
    next(error);
  }
};

const getLikedUsersForPublication = async (req, res, next) => {
  const { id } = req.params;
  try {
    const likedUsers = await publicationService.getLikedUsersForPublication(id);
    res.json(likedUsers);
  } catch (error) {
    console.error('Error while fetching liked users for publication:', error.message);
    next(error);
  }
};

module.exports = {
  list,
  create,
  update,
  remove,
  updateLikes,
  getLikedUsersForPublication
};
