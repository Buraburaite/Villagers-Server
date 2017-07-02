const bcrypt = require('bcrypt');

// Get the hash of a password (synchronous)
const getHash = (pw) => bcrypt.hashSync(pw, bcrypt.genSaltSync(16));

module.exports = { getHash };
