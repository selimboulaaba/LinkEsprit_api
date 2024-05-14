const { verifySecretToken } = require('../utils/secretToken.util')

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'You Need To Login' })
  }

  const result = await verifySecretToken(token)
  if (result.status) {
    req.role = result.role
    next()
  } else {
    return res
      .status(401)
      .json({ message: 'Token Is Expired Or Invalid, You Need To Login' })
  }
}

module.exports.roleVerification = (roles) => (req, res, next) => {
  const { role: userRole } = req
  let isAllowed = false

  roles.forEach((role) => {
    if (role === userRole) {
      isAllowed = true
    }
  })

  if (!isAllowed) {
    res.status(401).json({ message: 'Unauthorized' })
  } else {
    next()
  }
}
