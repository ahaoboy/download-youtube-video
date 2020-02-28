// const ytdl = require('ytdl-core');
const fs = require('fs')
const axios = require('axios')

export async function  download(url, filePath) {
  let resp =await axios.get(url)
  fs.writeFileSync(filePath,resp.data,'utf8')
}