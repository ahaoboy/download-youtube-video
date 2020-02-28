const core = require('@actions/core');
const os = require('os');
const path = require('path');
const fse = require('fs-extra');
const extra = require('execa');
import {postRelease} from './util';
import {bundleZip} from './zip';
import execa from 'execa';
const fs = require('fs');
import {download} from './download';
// most @actions toolkit packages have async methods
async function run() {
  try {
    const currentdir = path.resolve('.');
    const tmpDir = path.join(os.tmpdir(), '-youtube-video');
    const videoDir = path.join(tmpDir, 'video');
    const zipDir = path.join(tmpDir, 'zip');

    fse.ensureDirSync(videoDir);
    fse.ensureDirSync(zipDir);

    const url = core.getInput('url');
    console.log('url',url)
    // const isList = core.getInput('isList');
    // const isZip = core.getInput('isZip');
    // uname -a

    // curl https://bc.gongxinke.cn/downloads/install-python-latest | bash

    // let s = "curl https://bc.gongxinke.cn/downloads/install-python-latest | bash"
    // await execa(s)

    // try(
    // let version = (await execa('python --version')).stdout;
    // console.log('py version', version);
    // )catch (e){
    // console.log('eeee',e)
    // }

    // execa('npm --version').then(
    //     data=>{

    //       console.log('npm version',data.stdout)

    //       execa('npm i -g ytdl').then(
    //         data=>{
    //           execa('')
    //         }
    //       )
    //     }
    // ).catch(
    //   e=>console.log('eee',e)
    // )

    // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
    // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
    // TypeScript: import ytdl = require('ytdl-core'); with neither of the above

    // let w =ytdl(url)
    // w.pipe(fs.createWriteStream(path.join(videoDir, 'video.flv')));

    // w.on('close',()=>{

    // await download(url, path.join(videoDir, 'video.html'));]
    const videoPath = path.join(videoDir, 'video.flv')
    await download(url,videoPath );

    // })
    // process.chdir(videoDir);
    // const zipPath = path.join(zipDir, 'video-tmp.zip');
    // await extra('pip install you-get')

    // let args = [url];
    // if (isList) args.push('--playlist');

    // console.log(zipDir)
    // await extra('you-get', args)

    // fse.outputFileSync(path.join(videoDir, 'hello.txt'), 'hell world', 'utf8');

    // await bundleZip(videoDir, zipPath);

    // await postRelease(zipPath);
    await postRelease(videoPath);

    core.setOutput('time', new Date().toTimeString());

    // const isList = core.getInput('isList');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
