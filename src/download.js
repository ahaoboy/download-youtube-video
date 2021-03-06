// const ytdl = require('ytdl-core');
const fs = require('fs');
const axios = require('axios');
const ytdl = require('ytdl-core');

export async function download(url, filePath) {
  // let resp = await axios.get(url);
  // fs.writeFileSync(filePath, resp.data, 'utf8');
  // return

  let w = ytdl(url);
  let r = fs.createWriteStream(filePath);
  w.pipe(r);

  return new Promise(resolve => {
    w.on('close', () => {
      resolve();
    });
  });
  
  // let w = ytdl(url)
  // let r = fs.createWriteStream(filePath)
  // w.pipe(r);

  // return new Promise(
  //   resolve => {
  //     w.on('close', () => {
  //       resolve()
  //     })
  //   }
  // )
}
