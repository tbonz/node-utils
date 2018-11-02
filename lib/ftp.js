const PromiseFtp = require('promise-ftp');

const upload = async (dir, filename) => {
  var ftp = new PromiseFtp();
  try {
    ftp.connect({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PWD,
    })
    .then(() => {
      return ftp.put(`./${dir}/${filename}`, filename);
    }).then(() => {
      return ftp.end();
    });
  } catch (e) {
    Promise.reject(e.message);
  }
};

module.exports = {
  upload,
};
