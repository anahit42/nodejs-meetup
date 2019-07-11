const BaseError = require('./base-error');

module.exports = class SingleError extends BaseError {
  constructor(message, slug, details = {}) {
    const errors = [{
      slug,
      message,
      details,
    }];

    // Calling parent constructor of base Error class.
    super(message, errors);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
};
