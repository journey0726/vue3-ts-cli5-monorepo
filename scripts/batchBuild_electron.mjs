import execa from 'execa'
import ora from 'ora'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const spinner = ora()
spinner.stop()

const getAllModules = () => {
  let packages = fs.readdirSync(path.resolve(__dirname, '../packages'))
  return packages.filter((item) => item !== 'share')
}

const getUserCheckedPackages = (packages) => {
  const list = [
    {
      type: 'checkbox',
      message: '选择要打包的模块:',
      name: 'build',
      choices: packages.map((item) => ({ name: item })),
    },
  ]

  return new Promise((resolve) => {
    inquirer.prompt(list).then((r) => {
      resolve(r.build)
    })
  })
}

const start = async () => {
  const packageNames = getAllModules()
  const buildNames = await getUserCheckedPackages(packageNames)
  let done = manageNum(buildNames)
  buildNames.forEach((name) => {
    build(name, done)
  })
}

start()

async function build(moduleName, callback) {
  process.env.TARGETMODULE = moduleName
  try {
    dotenv.config({ path: `./packages/${moduleName}/.env.prod` })
    await execa('vue-cli-service', ['electron:build'])
    buildSuccess(moduleName)
    callback(moduleName)
    return
  } catch (e) {
    callback(moduleName)
    return buildFail(e)
  }
}

function loading(names) {
  spinner.start()
  spinner.color = 'blue'
  spinner.text = `${names.length}个项目(${names})正在打包！`
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

function manageNum(names) {
  let num = names.length
  if (num == 0) {
    return spinner.succeed('无需打包')
  }
  let copyNames = [...names]
  loading(copyNames)
  return (name) => {
    num--
    copyNames = copyNames.filter((item) => item !== name)
    loading(copyNames)
    if (num == 0) {
      spinner.stop()
    }
  }
}
