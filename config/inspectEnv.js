module.exports = (env) => {
  if (!env.MONGODB_URI) {
    console.log('MONGODB_URI not set');
  }
  if (!env.SESSION_SECRET) {
    console.log('SESSION_SECRET not set');
    env.SESSION_SECRET = 'Q7BpDTZ$3WQwSRe3X%0p';
  }
  if (!env.NODE_ENV) {
    console.log('NODE_ENV not set');
  }
}
