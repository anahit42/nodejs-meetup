const SingleError = require('../single-error');

module.exports = class SingleValidateError extends SingleError {
  constructor(message, slug, path) {
    const details = {
      path,
    };

    // Calling parent constructor of base Error class.
    super(message, slug, details);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    this.statusCode = 409;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
};
