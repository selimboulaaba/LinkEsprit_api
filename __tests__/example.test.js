// userService.test.js

const userService = require('../src/services/auth.service');
const userModel = require('../src/models/user.model');
const { createSecretToken } = require('../src/utils/secretToken.util');
const sendEmail = require("../src/utils/email/sendEmail.util");

jest.mock('../src/models/user.model');
jest.mock('../src/utils/secretToken.util');
jest.mock('../src/utils/email/sendEmail.util');

describe('userService', () => {
  describe('requestPasswordReset', () => {
    it('should send password reset email for existing user', async () => {
      const email = 'test@example.com';
      const existingUser = { _id: 'user_id', name: 'Test User' };
      const token = 'dummyToken';
      const expectedLink = `localhost:5173/passwordReset?id=${existingUser._id}&token=${token}`;
      
      userModel.findOne.mockResolvedValue(existingUser);
      createSecretToken.mockReturnValue(token);

      await userService.requestPasswordReset(email);

      expect(sendEmail).toHaveBeenCalledWith(
        email,
        "Password Reset Request",
        { name: existingUser.name, link: expectedLink },
        "./template/requestResetPassword.handlebars"
      );
    });

    it('should throw error for non-existing user', async () => {
      const email = 'nonexistent@example.com';
      userModel.findOne.mockResolvedValue(null);

      await expect(userService.requestPasswordReset(email)).rejects.toThrow('User does not exist');
    });
  });
});
