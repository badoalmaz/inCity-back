const nodemailer = require("nodemailer");

const { SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT, API } = process.env;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivation(to, link) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: "Account activation on " + API,
      text: "",
      html: `
        <h1>Click on link to activate an account</h1>
        <a href="${link}">${link}</a>
      `,
    });
  }
}

module.exports = new MailService();
