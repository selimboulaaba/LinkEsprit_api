const { isValidObjectId } = require("mongoose");
const commentModel = require("../models/comment.model");
const publicationModel = require("../models/publication.model");
exports.list = async () => {
  const comments = await commentModel.find();

  return {
    comments,
    commentsNB: comments.length,
  };
};

exports.create = async (body) => {
  const comment = await commentModel.create(body);
  const publication = await publicationModel.findById(body.publicationId);
  publication.comments.push(comment._id);
  await publication.save();


  return comment;
};

exports.update = async (id, payload) => {
  const updatedcomment = await commentModel.findByIdAndUpdate(id, { $set: payload }, { new: true })
  return updatedcomment;
};
exports.remove = async (id) => {
  const deletedcomment = await commentModel.findByIdAndDelete(id);
  if (!deletedcomment) {
    throw new Error('comment not found');
  }
  return deletedcomment;
};

exports.getCommentsByPublicationId = async (id) => {
  const publication = await publicationModel.findById(id).populate({
    path: 'comments',
    populate: {
      path: 'userId',
      model: 'User'
    }
  }).sort({ commentDate: -1 });

  const comments = publication.comments;

  const mainComments = comments.filter(comment => !comment.parentCommentId);
  const replyComments = comments.filter(comment => comment.parentCommentId);

  replyComments.forEach(reply => {
    const parentComment = mainComments.find(comment => comment._id.equals(reply.parentCommentId));
    if (parentComment) {
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(reply);
    }
  });

  return mainComments;
}



