const { isValidObjectId } = require("mongoose");
const sectorModel = require("../models/sector.model");

exports.list = async () => {
  const sectors = await sectorModel.find();

  return {
    sectors,
    sectorsNB: sectors.length,
  };
};

exports.create = async (body) => {
  const sector = await sectorModel.create(body);

  return sector;
};

exports.update = async (id, payload) => {
  const updatedsector = await sectorModel.findByIdAndUpdate(id, { $set: payload }, { new: true })
  return updatedsector;
};

exports.remove = async (id) => {
    const deletedsector = await sectorModel.findByIdAndDelete(id);
    if (!deletedsector) {
      throw new Error('sector not found');
    }
    return deletedsector;
  };


