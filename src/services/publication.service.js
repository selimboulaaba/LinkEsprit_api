const { isValidObjectId } = require("mongoose");
const publicationModel = require("../models/publication.model");
const userModel = require("../models/user.model");
const offerModel = require('../models/offer.model')

exports.list = async ({ skip, limit, userId }) => {
  try {
    const userPublications = await publicationModel.find({ userId }).sort({ publicationDate: -1 });
    const user = await userModel.findById(userId);
    const followersPublications = await publicationModel.find({ userId: { $in: user.followersList }}).sort({ publicationDate: -1 });
    
    const offers = await offerModel.find({ isDeleted: false, isEnded: false }).populate(['sector', { path: 'publication' }])
    const offerPublications = []
    offers.map(offer => offerPublications.push(offer.publication))

    let allPublications = [...userPublications, ...followersPublications, ...offerPublications];

    const uniquePublicationIds = [];
    const uniquePublications = [];

    allPublications.forEach(publication => {
      const publicationIdString = publication._id.toString();
      if (!uniquePublicationIds.includes(publicationIdString)) {
        uniquePublicationIds.push(publicationIdString);
        uniquePublications.push(publication);
      }
    });
    
    uniquePublications.sort((a, b) => b.publicationDate - a.publicationDate);
    let totalCount = 0
    let resultPublications = [];

    if (skip <= uniquePublications.length) {
      resultPublications = uniquePublications.slice(skip, skip + 1)
      totalCount = 1
    }else {
      resultPublications = []
    }

    return { publications: resultPublications, totalCount };
  } catch (error) {
    throw error;
  }
};

exports.getTotalCount = async () => {
  const totalCount = await publicationModel.countDocuments();
  return totalCount;
};

exports.create = async (body) => {
  const publication = await publicationModel.create(body);

  return publication;
};

exports.update = async (id, payload) => {
  const updatedpublication = await publicationModel.findByIdAndUpdate(id, { $set: payload }, { new: true })
  return updatedpublication;
};

exports.updateLikes = async (id, payload) => {
  try {
    const publication = await publicationModel.findById(id);

    if (!publication) {
      throw new Error('Publication not found');
    }

    const { likeUserId } = payload;

    const index = publication.likes.findIndex(like => like.userId.toString() === likeUserId.toString());

    if (index === -1) {
      publication.likes.push({ userId: likeUserId });
    } else {
      publication.likes.splice(index, 1);
    }

    const updatedPublication = await publication.save();

    return updatedPublication;
  } catch (error) {
    console.error('Error updating likes:', error);
    throw error;
  }
};

exports.getLikedUsersForPublication = async (publicationId) => {
  try {
    const publication = await publicationModel.findById(publicationId).populate('likes.userId');

    if (!publication) {
      throw new Error('Publication not found');
    }

    const likedUsers = publication.likes.map(like => like.userId);

    return likedUsers;
  } catch (error) {
    console.error('Error getting liked users for publication:', error);
    throw error;
  }
};

exports.remove = async (id) => {
    const deletedpublication = await publicationModel.findByIdAndDelete(id);
    if (!deletedpublication) {
      throw new Error('publication not found');
    }
    return deletedpublication;
  };


