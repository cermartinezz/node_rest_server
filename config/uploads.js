const fileUpload = require('express-fileupload');

const uploadsConfig = fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  createParentPath: true
});

module.exports = {
  uploadsConfig
}