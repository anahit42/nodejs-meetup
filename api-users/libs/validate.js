const joi = require('joi');
const MultiValidateError = require('./errors/validation/multi-validate-error');

function getInputValidator(validationSchema) {
  return async (ctx, next) => {
    const inputTypes = ['params', 'query', 'body', 'headers'];
    let input;

    ctx.request.validated = {};

    for (let i = 0; i < inputTypes.length; i++) {
      const joiSchema = validationSchema[inputTypes[i]];
      if (!joiSchema) {
        continue;
      }

      console.log(`Validating input ${inputTypes[i]}`);

      if (inputTypes[i] === 'params') {
        input = ctx.params;
      } else {
        input = ctx.request[inputTypes[i]];
      }

      const res = joi.validate(input, joiSchema, {
        abortEarly: false,
      });

      ctx.request.validated[inputTypes[i]] = res.value;

      if (res.error) {
        const { error } = res;
        if (error.details && error.details.length) {
          const errors = error.details.map(err => ({
            message: err.message,
            slug: `invalid-${err.context.key}-${err.type.replace(/\./g, '-').toLowerCase()}`,
            details: { path: err.context.key },
          }));

          throw new MultiValidateError(res.error.message, errors);
        }
      }
    }

    return next();
  };
}

module.exports = getInputValidator;
