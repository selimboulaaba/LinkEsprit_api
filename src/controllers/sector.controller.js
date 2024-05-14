const sectorService = require('../services/sector.service');

const list = async (req, res, next) => {
  try {
    const sectors = await sectorService.list();
    res.json(sectors);
  } catch (error) {
    console.error('Error while fetching sectors:', error.message);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const sector = await sectorService.create(req.body);
    res.json(sector);
  } catch (error) {
    console.error('Error while creating sector:', error.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedsector = await sectorService.update(id, payload);
    res.json(updatedsector);
  } catch (error) {
    console.error('Error while updating sector:', error.message);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedsector = await sectorService.remove(id);
    res.json(deletedsector);
  } catch (error) {
    console.error('Error while removing sector:', error.message);
    next(error);
  }
};

module.exports = {
  list,
  create,
  update,
  remove
};
