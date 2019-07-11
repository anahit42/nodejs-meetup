module.exports = class BaseError extends Error {
  constructor(message, errors) {
    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Main errors structre
    this.errors = errors;
  }
};
