const validateFields = require('./requestValidate');
const validateToken = require('./validateToken');
const validateRole = require('./validateRole');


module.exports = {
  ...validateFields,
  ...validateToken,
  ...validateRole
}