const fs = require('fs');
const PromiseFtp = require('promise-ftp');
const archiver = require('archiver');

exports.upload = async (dir, filename) => {

  var ftp = new PromiseFtp();
  ftp.connect({host: process.env.FTP_HOST, user: process.env.FTP_USER, password: process.env.FTP_PWD})
  .then(() => {
    return ftp.put(`./${dir}/${filename}`, filename);
  }).then(() => {
    return ftp.end();
  });

}

exports.compressDir = async (sourceDir, outputDir, outputFilename) => {
  return new Promise((resolve,reject) => {
    
    // create a file to stream archive data to.
    const zip = fs.createWriteStream(`./${outputDir}/${outputFilename}`);

    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    // 'close' event is fired when a file descriptor is involved
    zip.on('close', function() {
      // console.log(archive.pointer() + ' total bytes compressed');
      resolve('fail');
    });

    archive.on('error', function(err) {
      reject(err);
    });

    // pipe archive data to the file
    archive.pipe(zip);

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(`./${sourceDir}/`, false);

    // finalize the archive
    archive.finalize();

  });
}
