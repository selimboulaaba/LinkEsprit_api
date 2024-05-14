const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');
const offerModel = require('../models/offer.model');
const quizModel = require("../models/quiz.model");
const testModel = require("../models/test.model");
const applicationModel = require("../models/application.model");
const publicationModel = require('../models/publication.model')

exports.list = async () => {
  const users = await userModel.find()
  return {
    users,
    usersNB: users.length
  }
}
exports.getById = async (id) => {
  const user = await userModel.findById(id).populate('followersList')
  return user
}

exports.create = async (body) => {
  const user = await userModel.create(body)
  return user
}

exports.update = async (id, payload) => {
  if (payload.password != "") {
    payload.password = await bcrypt.hash(payload.password, 12);
  } else {
    const { password, ...restPayload } = payload;
    payload = restPayload
  }
  const updatedUser = await userModel.findByIdAndUpdate(id, { $set: payload }, { new: true })
  return updatedUser
}

exports.verifyPassword = async (id, password) => {
  const user = await userModel.findById(id);
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  return isPasswordCorrect;
}

exports.desactivate = async (id) => {
  const desactivatedUser = await userModel.findByIdAndUpdate(id, {
    $set: {
      isDesactivated: true
    }
  }, { new: true })
  return desactivatedUser
}

exports.activate = async (id) => {
  const activatedUser = await userModel.findByIdAndUpdate(id, {
    $set: {
      isDesactivated: false,
      isVerified: true
    }
  }, { new: true })
  return activatedUser
}

exports.verify = async (id) => {
  const verifyUser = await userModel.findByIdAndUpdate(id, {
    $set: {
      isVerified: true
    }
  }, { new: true })
  return verifyUser
}

exports.followUser = async (userId, userToFollowId) => {
  const user = await userModel.findById(userId);
  const userToFollow = await userModel.findById(userToFollowId);

  if (!user || !userToFollow) {
    throw new Error('User not found');
  }

  if (user.followersList.includes(userToFollowId)) {
    throw new Error('User is already being followed');
  }

  user.followersList.push(userToFollowId);
  await userModel.updateOne(
    { _id: userId },
    { $push: { followersList: userToFollowId } }
  );

  return { message: 'User followed successfully' };
};

exports.unfollowUser = async (userId, userToUnfollowId) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const index = user.followersList.indexOf(userToUnfollowId);


  if (index === -1) {
    throw new Error('User is not being followed');
  }


  user.followersList.splice(index, 1);

  // Save the updated user documentgit
  await userModel.updateOne(
    { _id: userId },
    { $pull: { followersList: userToUnfollowId } }
  );

  return { message: 'User unfollowed successfully' };
};

exports.getByName = async (name) => {
  const users = await userModel.find({
    $or: [
      { firstName: { $regex: name, $options: 'i' } },
      { lastName: { $regex: name, $options: 'i' } },
      { enterpriseName: { $regex: name, $options: 'i' } }
    ]
  });

  return users
}

exports.autoConfirmAccount = async (userIdentifiant, role) => {
  try {
    let user = null;
    const existingStudent = await Student.findOne({ identifiant: userIdentifiant });
    const existingTeacher = await Teacher.findOne({ identifiant: userIdentifiant });

    if (existingStudent && role === "STUDENT") {

      user = await userModel.findOneAndUpdate(
        { identifiant: userIdentifiant },
        { $set: { isVerified: true } },
        { new: true }
      );
    }
    else if (existingTeacher && role === "TEACHER") {
      user = await userModel.findOneAndUpdate(
        { identifiant: userIdentifiant },
        { $set: { isVerified: true } },
        { new: true }
      );
    }
    if (user) {
      return user
    }
    return null;
  } catch (error) {
    console.error('Error confirming account:', error);
  }
};

exports.updateSkills = async (id, skills) => {
  const UserWithNewSkills = await userModel.findByIdAndUpdate(id, {
    $set: {
      skills: skills,
    }
  }, { new: true })
  return UserWithNewSkills
}

exports.getSkills = async () => {
  try {
    const uniqueSkills = await userModel.distinct('skills');
    return uniqueSkills;
  } catch (error) {
    console.error("Error while fetching unique skills:", error);
    throw error;
  }
}

exports.getOwnSkills = async (id) => {
  try {
    const user = await userModel.findById(id)
    return user.skills;
  } catch (error) {
    console.error("Error while fetching unique skills:", error);
    throw error;
  }
}

exports.getStudentList = async (role) => {
  try {
    let students = [];
    if (role === 'STUDENT') {
      students = await userModel.find({ role: 'STUDENT' });
    }
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students');
  }
};

exports.getDashboard = async () => {
  const result = {};
  result.nbEntreprises = await userModel.find({ role: 'ENTREPRISE' }).countDocuments();
  result.nbStudents = await userModel.find({ role: 'STUDENT' }).countDocuments();
  result.nbAlumnis = await userModel.find({ role: 'ALUMNI' }).countDocuments();
  result.nbOffers = await offerModel.countDocuments();
  result.nbQuizzs = await quizModel.countDocuments();

  result.countOffersBySectors = await offerModel.aggregate([
    {
      $group: {
        _id: '$sector',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'sectors',
        localField: '_id',
        foreignField: '_id',
        as: 'sectorInfo'
      }
    },
    {
      $unwind: '$sectorInfo'
    },
    {
      $project: {
        _id: 0,
        sector: '$sectorInfo.name',
        count: 1
      }
    }
  ]);

  result.averageQuizScores = await testModel.aggregate([
    {
      $group: {
        _id: '$quiz',
        averageScore: { $avg: '$score' }
      }
    },
    {
      $lookup: {
        from: 'quizzes',
        localField: '_id',
        foreignField: '_id',
        as: 'quiz'
      }
    },
    {
      $unwind: '$quiz'
    },
    {
      $project: {
        _id: '$quiz._id',
        name: '$quiz.name',
        questions: '$quiz.quiz',
        averageScore: 1
      }
    }
  ]);

  result.publications = await publicationModel.find();
  const offerIds = result.publications.map(publication => publication._id);

  result.offers = await offerModel.find({ publication: { $in: offerIds } })
    .populate([
      'sector',
      {
        path: 'publication',
        populate: {
          path: 'userId',
        }
      }
    ]).exec();

  const userIds = []
  result.entreprises = []
  result.offers.map(offer => {
    if (!userIds.includes(offer.publication.userId._id)) {
      userIds.push(offer.publication.userId._id)
      result.entreprises.push(offer.publication.userId)
    }
  })

  result.applications = await applicationModel.find({ state: "ACCEPTED" })
    .populate('userId')
    .populate({
      path: 'offerId',
      populate: {
        path: 'publication',
        populate: {
          path: 'userId'
        }
      }
    })
    .exec();

  return { result }
}
