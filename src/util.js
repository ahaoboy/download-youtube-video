import { GitHub } from '@actions/github'
import { setFailed } from '@actions/core/lib/core'
import { basename } from 'path'
import { getType } from 'mime'
const fs  =  require( 'fs')
const { lstatSync, readFileSync } = require('fs')

// const github = new GitHub(process.env.GITHUB_TOKEN!)
const github = {}
async function postRelease(filePath)  {
  try {
    if (!process.env.GITHUB_REF.startsWith('refs/tags/')) {
      throw new Error('A tag is required for GitHnpmub Releases')
    }

    let changelog 
    const changelogPath = process.env.INPUT_CHANGELOG

    if (changelogPath) {
      changelog = fs.readFileSync(replaceEnvVariables(changelogPath), 'utf8')
    }

    const release = await createGithubRelease(changelog)
    const assetPath = filePath

    if (assetPath) {
      const asset = getAsset(replaceEnvVariables(assetPath))
      await uploadAsset(release.upload_url, asset)
    }

    console.log(`Release uploaded to ${release.html_url}`)
  } catch (error) {
    console.log(error)
    setFailed(error.message)
  }
}

async function createGithubRelease(changelog)  {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
  const tag = process.env.GITHUB_REF.split('/')[2]

  const response = await github.repos.createRelease({
    owner,
    repo,
    tag_name: tag,
    name: tag,
    body: changelog,
    draft: false,
    prerelease: false,
  })
  return response.data
}

function getAsset(path) {
  return {
    name: basename(path),
    mime: getType(path) || 'application/octet-stream',
    size: lstatSync(path).size,
    file: readFileSync(path)
  }
}

async function uploadAsset(url, asset) {
  return github.repos.uploadReleaseAsset({
    url,
    headers: {
      'content-length': asset.size,
      'content-type': asset.mime
    },
    name: asset.name,
    file: asset.file
  })
}

function replaceEnvVariables(path) {
  return path
    .replace(/\$GITHUB_WORKSPACE/g, process.env.GITHUB_WORKSPACE)
    .replace(/\$HOME/g, process.env.HOME)
}

export {
    postRelease
}