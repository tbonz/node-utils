const fs = require('fs');
const archiver = require('archiver');

const compress = async (sourceDir, outputDir, outputFilename) => new Promise((resolve, reject) => {
  // create a file to stream archive data to.
  const zip = fs.createWriteStream(`./${outputDir}/${outputFilename}`);

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // 'close' event is fired when a file descriptor is involved
  zip.on('close', () => {
    // console.log(archive.pointer() + ' total bytes compressed');
    resolve('success');
  });

  archive.on('error', (err) => {
    reject(err);
  });

  // pipe archive data to the file
  archive.pipe(zip);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(`./${sourceDir}/`, false);

  // finalize the archive
  archive.finalize();
});

module.exports = {
  compress,
};
