module.exports = function(mongooseModule) {
  mongooseModule.Promise = global.Promise; // quiets an error in Mongoose >= 4.1.0
}
