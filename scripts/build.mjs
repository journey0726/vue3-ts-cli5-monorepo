import execa from 'execa'
import ora from 'ora'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const spinner = ora()
spinner.stop()

// 先删掉dist文件夹，再构建
function begin() {
  deleteDistFolder()
  getBuildModules()
}

begin()

function deleteDistFolder() {
  const distPath = path.resolve(__dirname, '../dist')
  if (fs.existsSync(distPath)) {
    deleteFolder(distPath)
  }
}
// --module 为需要打包的模块名称，以逗号隔开
async function getBuildModules() {
  const RegExp = /^--module.*$/
  const moduleNames = process.argv.find((m) => RegExp.test(m))
  if (!moduleNames) {
    buildFail('请携带--module 参数，多个包之间以逗号隔开!')
    return
  }
  let moduleNamesArr = moduleNames.split('=')[1].split(',')
  for (let m of moduleNamesArr) {
    try {
      await fs.promises.stat(path.resolve(__dirname, `../packages/${m}`))
    } catch (e) {
      buildFail(`未在'packages'目录下找到包名为 “${m}” 的模块!`)
      continue
    }
    process.env.TARGETMODULE = m
    await build(m)
  }
}

function deleteFolder(path) {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

async function build(moduleName) {
  loading(moduleName)
  try {
    dotenv.config({ path: `./packages/${moduleName}/.env.prod` })
    await execa('vue-cli-service', ['build'])
    buildSuccess(moduleName)
    return
  } catch (e) {
    return buildFail(e)
  }
}

function loading(moduleName = '') {
  spinner.start()
  spinner.color = 'blue'
  spinner.text = `============================building ${moduleName}==============================`
}

function buildSuccess(moduleName = '') {
  spinner.stop()
  spinner.text = `build the module "${moduleName}" success!`
  spinner.succeed()
}

function buildFail(e) {
  const msg = typeof e == 'string' ? e : JSON.stringify(e)
  spinner.stop()
  spinner.text = msg
  spinner.fail()
}
