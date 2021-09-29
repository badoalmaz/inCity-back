const { v4: uuid } = require("uuid");

const generateFileName = (mimetype) => {
  return uuid() + "." + mimetype.split("/")[1];
};

module.exports = {
  generateFileName,
};
