const Client = require('ftp');

const upload = async (dir, filename) => new Promise((resolve, reject) => {
  try {
    const c = new Client();

    c.on('ready', () => {
      c.put(`./${dir}/${filename}`, filename, (err) => {
        if (err) reject(err);
        c.end();
        resolve('success');
      });
    });

    c.on('error', (err) => {
      reject(err);
    });

    c.connect({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PWD,
    });
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  upload,
};
