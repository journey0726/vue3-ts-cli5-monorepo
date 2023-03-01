import execa from 'execa'
import inquirer from 'inquirer'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getAllModules = () => {
  let packages = fs.readdirSync(path.resolve(__dirname, '../packages'))
  return packages.filter((item) => item !== 'share')
}

const getModuleName = (packages) => {
  const list = [
    {
      type: 'list',
      message: '选择要运行的项目:',
      name: 'dev',
      choices: packages.map((item) => ({ name: item })),
    },
  ]

  return new Promise((resolve) => {
    inquirer.prompt(list).then((r) => {
      resolve(r.dev)
    })
  })
}

const dev = (moduleName) => {
  process.env.TARGETMODULE = moduleName
  try {
    dotenv.config({ path: `./packages/${moduleName}/.env.dev` })
    execa('vue-cli-service', ['electron:serve']).stdout.pipe(process.stdout)
    // const result = execa('vue-cli-service', ['serve'], (error, stdout, stderr) => {
    //   if (error) {
    //     throw error
    //   }
    //   console.log(stdout)
    // })
    // result.stdout.on('data', function (data) {
    //   console.log('data', data)
    // })
  } catch (e) {
    console.log(e)
  }
}

const start = async () => {
  const allModuleName = getAllModules()
  let moduleName = await getModuleName(allModuleName)
  dev(moduleName)
}

start()
