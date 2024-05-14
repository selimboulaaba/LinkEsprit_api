const userModel = require("../models/user.model");
const authService = require("../services/auth.service");
//const User = require('../models/user.model');
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const { createSecretToken } = require("../utils/secretToken.util");
const { default: mongoose } = require("mongoose");
const sendEmail = require("../utils/email/sendEmail.util");
const userService = require("../services/user.service");

module.exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    newUser.image =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const result = await authService.signup(newUser);
    await userService.autoConfirmAccount(newUser.identifiant, newUser.role);

    const { user } = result;
    res.status(201).json({
      message: `User with email ${user.email} signed in successfully`,
    });
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      token: token,
      message: "User logged in successfully",
      success: true,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports.resetPasswordRequestController = async (req, res, next) => {
  const link = await authService.requestPasswordReset(req.body.email);
  return res.json(link);
};

module.exports.resetPasswordController = async (req, res, next) => {
  const { id, token } = req.query;
  const { password } = req.body;
  const isResetSuccess = await authService.resetPassword(id, password, token);
  return res.json(isResetSuccess);
};

//Google Auth

module.exports.googleLoginCallback = async (req, res, next) => {
  try {
    let message =
      "User logged in with Google and saved to MongoDB successfully";
    let success = true;

    const newUser = req.body;
    newUser.password = req.body.sub;
    newUser.role = "STUDENT";
    newUser.image = newUser.picture;
    newUser.identifiant = req.body.identifiant;
    const existingUser = await userModel.findOne({ email: newUser.email });

    let token = "";
    if (!existingUser) {
      const userId = new mongoose.Types.ObjectId();

      newUser._id = userId;
      token = createSecretToken(newUser._id, newUser.role);
      await authService.signup(newUser);
      const newU = await userService.autoConfirmAccount(newUser.identifiant, newUser.role);
      try {
        newUser.link = "http://localhost:5173/authentication/sign-in";
        sendEmail(
          newUser.email,
          "Account Created with Google Mail",
          newUser,
          "./template/GoogleAccountCreated.handlebars"
        );
      } catch (error) {
        console.log("Error sending email:");
        return { success: false, error: error.message };
      }
      token = createSecretToken(newUser._id, newUser.role);
      if (newU === null || !newU.isVerified) {
        message = "Wait for Verification";
        success = false;
      }
    } else {
      token = createSecretToken(existingUser._id, existingUser.role);
      if (existingUser.isDesactivated) {
        message = "User is Banned";
        success = false;
      } else if (!existingUser.isVerified) {
        message = "Wait for Verification";
        success = false;
      }
    }

    // Respond with success message and saved user data
    res.status(201).json({
      token: token,
      message: message,
      success: success,
    });
  } catch (error) {
    // Handle errors
    return res.status(400).json({ message: error.message });
  }
};

module.exports.verifierExistingUser = async (req, res, next) => {
  try {
    const existingUser = await userModel.findOne({ email: req.params.email });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
