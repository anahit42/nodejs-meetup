const SingleError = require('./single-error');

module.exports = class NotFoundError extends SingleError {
  constructor(message, path) {
    const details = {
      path,
    };

    // Calling parent constructor of base Error class.
    super(message, `${path}-not-found`, details);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    this.statusCode = 404;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
};
