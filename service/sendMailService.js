const { User } = require("../models/models");

class SendMailService {
  static activate = async (link) => {
    const user = await User.findOne({ where: { activationLink: link } });
    if (!user) {
      throw ErrorHandler.BadRequest("Activation link is incorrect");
    }

    user.isActivated = true;
    await user.save();
  };
}

module.exports = SendMailService;
