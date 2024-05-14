const userService = require('../services/user.service')
const authService = require('../services/auth.service')
const sendEmail = require('../utils/email/sendEmail.util')


async function list(req, res, next) {
  try {
    res.json(await userService.list())
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function getById(req, res, next) {
  try {
    res.json(await userService.getById(req.params.id))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function create(req, res, next) {
  try {
    res.json(await userService.create(req.body))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function update(req, res, next) {
  try {
    const user = JSON.parse(req.body.user)
    if (req.file) {
      user.image = "http://localhost:3000/Images/" + req.file.filename
    }
    res.json(await userService.update(req.params.id, user))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function verifyPassword(req, res, next) {

  try {
    res.json(await userService.verifyPassword(req.params.id, req.body.password))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function desactivate(req, res, next) {
  try {
    res.json(await userService.desactivate(req.params.id))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function activate(req, res, next) {
  try {
    res.json(await userService.activate(req.params.id))
  } catch (err) {
    console.error('Error while activating a user', err.message)
    next(err)
  }
}

async function verify(req, res, next) {
  try {
    res.json(await userService.verify(req.params.id))
  } catch (err) {
    console.error('Error while verifing a user', err.message)
    next(err)
  }
}

async function addAdmin(req, res, next) {
  try {
    const newUser = req.body
    newUser.isVerified = true
    const randomPassword = generateRandomPassword(10);
    newUser.password = randomPassword;
    try {
      newUser.link = "http://localhost:5173/authentication/sign-in";
      sendEmail(
        newUser.email,
        "Admin Account Created",
        newUser,
        "./template/AdminAccountCreated.handlebars"
      );
    }
    catch (error) {
      console.log("Error sending email:");
      return { success: false, error: error.message };
    }
    const result = await authService.signup(newUser)

    res
      .status(201)
      .json({
        message: `User with email ${newUser.email} created successfully`
      })
    next()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

function generateRandomPassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}
async function followUser(req, res, next) {
  try {
    const { userId, userToFollowId } = req.params;
    const result = await userService.followUser(userId, userToFollowId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function unfollowUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const userToUnfollowId = req.params.userToUnfollowId;
    const result = await userService.unfollowUser(userId, userToUnfollowId);
    res.json(result);
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getByName(req, res, next) {
  try {
    res.json(await userService.getByName(req.params.name))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function getDashboard (req, res, next) {
  try {
    res.json(await userService.getDashboard())
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function updateSkills(req, res, next) {
  try {
    res.json(await userService.updateSkills(req.params.id, req.body.skills))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function getSkills(req, res, next) {
  try {
    res.json(await userService.getSkills())
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function getOwnSkills(req, res, next) {
  try {
    res.json(await userService.getOwnSkills(req.params.id))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

async function getStudentList(req, res, next) {
  try {
    const { role } = req.params;
    res.json(await userService.getStudentList(role))

  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
}

module.exports = {
  list,
  create,
  update,
  desactivate,
  activate,
  verify,
  addAdmin,
  getById,
  verifyPassword,
  followUser,
  unfollowUser,
  getByName,
  getDashboard,
  updateSkills,
  getSkills,
  getOwnSkills,
  getStudentList
}
