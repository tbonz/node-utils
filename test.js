const lib = require('./lib');

(async () => {
  try {
    const result = await lib.ftp.uploadFtp('', 'file.fake');
    process.stdout.write(result);
  } catch (e) {
    process.stdout.write(e.message);
  }
})();
