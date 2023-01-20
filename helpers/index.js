const validators = require('./validators');
const createJWT = require('./jwt');
const googleVerify = require('./google-verify');
const uploadFiles = require('./uploadFiles');

module.exports = {
  ...validators,
  ...createJWT,
  ...googleVerify,
  ...uploadFiles
}

