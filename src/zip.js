// require modules
var fs = require('fs-extra');
const path = require('path');
var archiver = require('archiver');

export function bundleZip(fileDir, outputPath) {
  return new Promise(reslove => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: {level: 9}, // Sets the compression level.
    });

    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log(
        'archiver has been finalized and the output file descriptor has closed.'
      );
      // reslove();
    });

    output.on('end', function() {
      console.log('Data has been drained');
      reslove();
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err;
    });

    archive.pipe(output);
    archive.directory(fileDir, true);
    archive.finalize();
  });
}
