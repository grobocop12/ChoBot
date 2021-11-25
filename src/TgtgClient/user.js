const { userData } = require("../../config/config");

const currentUser = { ...userData, userId: null };

module.exports = currentUser;
