import bcrypt from 'bcrypt';

const generatePasswordHash = (password: string = '') => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, salt, function (err, hash: string) {
        if (err) return reject(err);

        resolve(hash);
      });
    });
  });
};

export default generatePasswordHash;
