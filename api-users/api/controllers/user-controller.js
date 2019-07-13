const UserModel = require('../../app/models/user-model');
const NotFoundError = require('../../libs/errors/not-found-error');
const mailerService = require('../../services/mailer-service');

class UserController {
  static async create (ctx) {
    const { email, firstName, lastName, password } = ctx.request.body;

    const user = await UserModel.create({ email, firstName, lastName, password });

    await mailerService.sendWelcomeEmail(user.email, { email, firstName, lastName });

    ctx.status = 201;
    ctx.body = user;
  }

  static async get (ctx) {
    const { userId } = ctx.params;

    const user = await UserModel.findOne({ _id: userId }, { password: 0 });

    if (!user) {
      throw NotFoundError(`User not found`, 'user');
    }

    cyx.status = 200;
    ctx.body = user;
  }
}

module.exports = UserController;
