const Router = require('koa-router');

const UserController = require('../controllers/user-controller');
const userSchema = require('../validations/user-schema');
const validate = require('../../libs/validate');

const userRouter = new Router();

userRouter.post(
  '/users',
  validate(userSchema.create),
  UserController.create,
);

userRouter.get(
  '/users/:userId',
  validate(userSchema.get),
  UserController.get,
);

module.exports = userRouter;
