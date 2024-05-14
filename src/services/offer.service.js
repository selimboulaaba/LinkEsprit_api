// const { isValidObjectId } = require('mongoose')
const { default: mongoose } = require('mongoose')
const offerModel = require('../models/offer.model')
const publicationModel = require('../models/publication.model')
const applicationService = require('../services/application.service')


exports.list = async () => {
  const offers = await offerModel.find({ isDeleted: false, isEnded: false }).populate(['sector', { path: 'publication', populate: { path: 'userId', select: ['enterpriseName', 'establishment', 'firstName', 'lastName', 'role', 'image'] } }])
  return {
    offers,
    offersNB: offers.length
  }
}
exports.getById = async (id) => {
  return await offerModel.findById(id).populate(['sector', { path: 'publication', populate: { path: 'userId', select: ['enterpriseName', 'establishment', 'firstName', 'lastName', 'role'] } }])
}

exports.create = async (body) => {
  const { publication, ...offer } = body
  const createdPublication = await publicationModel.create(publication)
  return await offerModel.create({ publication: createdPublication._id, ...offer })
}

exports.update = async (id, payload) => {
  await publicationModel.findByIdAndUpdate(payload.publication._id, { $set: payload.publication }, { new: true })
  return await offerModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).populate(['sector', { path: 'publication', populate: { path: 'userId', select: ['enterpriseName', 'establishment', 'firstName', 'lastName'] } }])
}
exports.deleteOffer = async (id) => {
  return await offerModel.findByIdAndUpdate(id, { $set: { isDeleted: true } })
}
exports.getOffersByUserId = async (userId) => {
  const applications = await applicationService.getApplications(userId);
  const offerIds = applications.map(application => application.offerId);
  return await offerModel.find({ _id: { $in: offerIds } });
}
exports.ownOffers = async (userId) => {
  const publications = await publicationModel.find({ userId: userId });
  const offerIds = publications.map(publication => publication._id);
  return await offerModel.find({ publication: { $in: offerIds } }).populate(['sector', { path: 'publication', populate: { path: 'userId', select: ['enterpriseName', 'establishment', 'firstName', 'lastName', 'role'] } }]);
}

exports.recommendStudentForOffer = async (offerId, teacherId, studentId) => {
  try {
    const isRecommended = await exports.verifyStudentRecommendation(offerId, studentId);
    if (isRecommended) {
      throw new Error('Student is already recommended for this offer');
    }

    const offer = await offerModel.findById(offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }

    const recommendation = {
      student: studentId,
      teacher: teacherId
    };

    offer.recommendation.push(recommendation);
    await offer.save();

    return { success: true, message: 'Student recommended for offer successfully' };
  } catch (error) {
    throw new Error(`Failed to recommend student for offer: ${error.message}`);
  }
}
exports.verifyStudentRecommendation = async (offerId, studentId) => {
  try {
   
    const offer = await offerModel.findById(offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }

    const isRecommended = offer.recommendation.some(recommendation => {
      return recommendation.student.equals(studentId); 
    });

    return isRecommended;
  } catch (error) {
    throw new Error(`Failed to verify student recommendation: ${error.message}`);
  }
}
exports.endOffer = async (offerId, isEnded) => {
  return await offerModel.findByIdAndUpdate(
    offerId,
    { $set: { isEnded: isEnded } },
    { new: true }
  );
}
exports.getRecommendedOffers = async (userId) => {
  try {
    const recommendedOffers = await offerModel.find({ 
      recommendation: { 
        $ne: [], 
        $elemMatch: { student: userId } 
      } 
    });

    return recommendedOffers;
  } catch (error) {
    throw new Error(`Failed to get recommended offers: ${error.message}`);
  }
}
exports.rejectOffer = async (recommendationId) => {
  try {
    const offer = await offerModel.findOne({ 'recommendation._id': recommendationId });
    
    if (!offer) {
      throw new Error('Offer not found');
    }

    const recommendationIndex = offer.recommendation.findIndex(rec => rec._id.toString() === recommendationId);

    if (recommendationIndex === -1) {
      
      return { success: false, message: 'Recommendation not found' };
    }

   
    offer.recommendation[recommendationIndex].isRejected = true;

    await offer.save();

    return offer;
  } catch (error) {
    throw new Error(`Error updating recommendation status: ${error.message}`);
  }
}

exports.getOffferByPublication = async (pubId) => {
  return await offerModel.findOne(({ publication: pubId }));
}
