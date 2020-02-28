const core = require('@actions/core');
const os = require('os');
const path = require('path');
const fse = require('fs-extra');
const extra = require('execa');
import {postRelease} from './util';
import {bundleZip} from './zip';
import execa from 'execa';

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
    const isList = core.getInput('isList');
    // const isZip = core.getInput('isZip');
    // uname -a

    // curl https://bc.gongxinke.cn/downloads/install-python-latest | bash

    let s = "curl https://bc.gongxinke.cn/downloads/install-python-latest | bash"
    await execa(s)
    let version = (await execa('python --version')).stdout;
    console.log('py version', version);

    process.chdir(videoDir);
    const zipPath = path.join(zipDir, 'video-tmp.zip');
    // await extra('pip install you-get')

    let args = [url];
    if (isList) args.push('--playlist');

    // console.log(zipDir)
    // await extra('you-get', args)
    fse.outputFileSync(path.join(videoDir, 'hello.txt'), 'hell world', 'utf8');

    await bundleZip(videoDir, zipPath);

    await postRelease(zipPath);
 

    core.setOutput('time', new Date().toTimeString());

    // const isList = core.getInput('isList');

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
