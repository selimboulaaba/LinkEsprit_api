const testModel = require("../models/test.model");

exports.list = async () => {
    const test = await testModel.find();
  
    return {
      test,
      testNB: test.length,
    };
  };
  exports.getById = async (id) => {
    const test = await testModel.findById(id);
    return test;
  };
  
  exports.create = async (body) => {
    const test = await testModel.create(body);
  
    return test;
  };
  
  exports.update = async (id, payload) => {
    const updatedtest = await testModel.findByIdAndUpdate(id, { $set: payload }, { new: true })
    return updatedtest;
  };
  
  exports.remove = async (id) => {
      const deletedtest = await testModel.findByIdAndDelete(id);
      if (!deletedtest) {
        throw new Error('test not found');
      }
      return deletedtest;
    };