const ytdl = require('ytdl-core');
const fs = require('fs')

export function download(url, filePath) {
  let w = ytdl(url)
  let r = fs.createWriteStream(filePath)
  w.pipe(r);

  return new Promise(
    resolve => {
      w.on('close', () => {
        resolve()
      })
    }
  )
}