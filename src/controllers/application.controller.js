const applicationService = require('../services/application.service');

async function applyToOffer(req, res, next) {
  try {
    const { offerId, userId } = req.body;
    const application = await applicationService.applyToOffer(offerId, userId, req.file.filename, req.file.originalname);
    res.json(application);
  } catch (error) {
    console.error('Error while applying to offer:', error.message);
    next(error);
  }
}

async function verify(req, res, next) {
  try {
    const { userId, offerId } = req.params;
    const isApplying = await applicationService.verify(userId, offerId);
    res.json(isApplying);
  } catch (error) {
    console.error('Error while fetching applications:', error.message);
    next(error);
  }
}

async function getApplicationsByOffer(req, res, next) {
  try {
    const applications = await applicationService.getApplicationsByOffer(req.params.offerId);
    res.json(applications);
  } catch (error) {
    console.error('Error while fetching applications:', error.message);
    next(error);
  }
}

async function replyToApplication(req, res, next) {
  try {
    const application = await applicationService.replyToApplication(req.params.applicationId, req.params.state);
    res.json(application);
  } catch (error) {
    console.error('Error while fetching applications:', error.message);
    next(error);
  }
}
const update = async (req, res, next) => {
  const { applicationId } = req.params;
 
  const {testId} = req.body;
  
  
  try {
    const updatedapplication = await applicationService.update(applicationId, testId);
    res.json(updatedapplication);
  } catch (error) {
    console.error('Error while updating application:', error.message);
    next(error);
  }
};

module.exports = {
  update,
  applyToOffer,
  verify,
  getApplicationsByOffer,
  replyToApplication
};
