const PromiseFtp = require('promise-ftp');

async function upload(dir, filename) {

  var ftp = new PromiseFtp();
  ftp.connect({host: process.env.FTP_HOST, user: process.env.FTP_USER, password: process.env.FTP_PWD})
  .then(() => {
    return ftp.put(`./${dir}/${filename}`, filename);
  }).then(() => {
    return ftp.end();
  });

}

module.exports = {
  upload: upload
};