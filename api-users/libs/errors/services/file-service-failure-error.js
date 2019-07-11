const SingleError = require('../single-error');

module.exports = class FileServiceFailedError extends SingleError {
  constructor(message, code) {
    const slug = 'file-server-error';

    // Calling parent constructor of base Error class.
    super(message, slug);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    this.statusCode = code;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
};
