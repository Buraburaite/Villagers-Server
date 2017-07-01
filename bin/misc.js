const getHash = (pw) => bcrypt.hashSync(pw, bcrypt.genSaltSync(16));

module.exports = { getHash };
