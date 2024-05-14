const { default: axios } = require("axios");
const Application = require("../models/application.model");
const fs = require('fs');
const offerModel = require('../models/offer.model');
const { INFORMATION_EXTRACTED } = require("../utils/constants.util");

exports.applyToOffer = async (offerId, userId, pdfFile, fileName) => {
    const resume = await extractSkills(pdfFile);
    const offer = await offerModel.findById(offerId).populate(['sector', { path: 'publication' }])

    const cvSkills = resume.skills.map(processSkills)
    const offerSkills = offer.skills.map(processSkills)
    let compatibility = 0;
    offerSkills.map(offerSkill => {
        cvSkills.map(cvSkill => {
            if (offerSkill === cvSkill) {
               
                compatibility += 1 / offerSkills.length;
            }
            return;
        })
    })

    const recommendationIndex = offer.recommendation.findIndex(rec =>
        rec.student.toString() === userId
    )
    if (recommendationIndex !== -1) {
        offer.recommendation[recommendationIndex].isApplied = true;
        try {
            await offer.save();
        } catch (error) {
            console.error('Error updating isApplied:', error.message);
        }
    }

    const newApplication = new Application({
        offerId,
        userId,
        pdfFile,
        fileName,
        state: "WAITING",
        compatibility
    });
    const application = await newApplication.save();
    return application;
};

exports.verify = async (userId, offerId) => {
    const application = await Application.findOne({ userId, offerId });
    return application
};

exports.getApplications = async (userId) => {
    const applications = await Application.find({ userId });
    return applications;
}

exports.getApplicationsByOffer = async (offerId) => {
    const applications = await Application.find({ offerId })
    .populate(['userId'])
    .populate({
        path: 'offerId',
        populate: {
            path: 'recommendation.teacher'
        }
    })
    .populate({
        path: 'testId',
        populate: {
            path: 'quiz'
        }
    });;
    return applications;
}

exports.replyToApplication = async (applicationId, state) => {
    const application = await Application.findByIdAndUpdate(applicationId, { state }).populate(['userId']).populate(['testId'])
    .populate({
        path: 'offerId',
        populate: {
            path: 'recommendation.teacher'
        }
    })
    .populate({
        path: 'testId',
        populate: {
            path: 'quiz'
        }
    });;;
    application.state = state
    return application;
}
exports.update = async (id, testId) => {
    const updatedApplication = await Application.findByIdAndUpdate(
        id,
        { $set: { testId: testId } }, // Construct an object with the field and its value
        { new: true } // Option to return the updated document
    ).populate(['userId']);
    
    return updatedApplication;
};

  

const processSkills = (skills) => {
    return skills.replace(/[^\w\s]/gi, '').toLowerCase();
}

const extractSkills = async (pdfFile) => {
    const fileData = fs.readFileSync('uploads/CVs/' + pdfFile);
    const base64File = fileData.toString('base64');

    const options = INFORMATION_EXTRACTED
    options.data.file = base64File
    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        throw (error);
    }
}


