const BaseError = require('../base-error');

module.exports = class MultiValidateError extends BaseError {
  constructor(message, errors) {
    // Calling parent constructor of base Error class.
    super(message, errors);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    this.statusCode = 409;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
};
