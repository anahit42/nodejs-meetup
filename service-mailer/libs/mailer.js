const config = require('config');
const fsExtra = require('fs-extra');
const MJML = require('mjml');
const Mustache = require('mustache');
const Sendgrid = require('sendgrid');

const sendgrid = Sendgrid(config.get('sendgridKey'));

class MailerLib {
  static async render (path, options) {
    const file = await fsExtra.readFile(path, 'utf8');
    const renderedFile = Mustache.render(file, options);
    const { html } = MJML(renderedFile, { filePath: path });

    return Mustache.render(html, options);
  }

  static async sendEmail ({ email, html, subject, text }) {
    const body = {
      from: {
        email: 'no-reply@mailinator.com',
        name: 'Node.js Armenia'
      },
      personalizations: [{
        subject,
        to: [{ email }]
      }],
      content: [{
        type: 'text/plain',
        value: text
      }, {
        type: 'text/html',
        value: html
      }]
    };

    const request = sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body
    });

    return sendgrid.API(request);
  }

  static async sendUserRegistrationEmail (email, user) {
    const subject = 'User Registration';
    const text = 'Welcome to Node.js Armenia community';
    const path = process.cwd() + '/templates/user_registration/index.mjml';
    const options = {
      FIRST_NAME: user.firstName,
      LAST_NAME: user.lastName
    };

    try {
      const html = await MailerLib.render(path, options);
      await MailerLib.sendEmail({ email, html, subject, text });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = MailerLib;

