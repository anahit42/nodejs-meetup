const Joi = require('joi');
const config = require('config');

const schemes = {
  create: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().regex(new RegExp(config.get('auth.passwordRegExp')), 'valid password').required(),
    }),
  },

  get: {
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }
};

module.exports = schemes;
