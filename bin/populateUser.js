const populateUser = (username) => {

  const myPromise = new Promise((resolve, reject) => {
    resolve({
      username: 'test'
    });
  });

  return myPromise;
};


module.exports = populateUser;
