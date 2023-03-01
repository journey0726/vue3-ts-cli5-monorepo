import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import ora from 'ora'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const spinner = ora()
spinner.stop()

const isDistExist = (distPath) => {
  return fs.existsSync(distPath)
}

const forEachDist = (path) => {
  let distArr = fs.readdirSync(path)
  if (distArr.length == 0) {
    return 'dist文件夹为空'
  } else {
    return distArr
  }
}

const exitProcess = (text, type = 'start') => {
  spinner[type](text)
  setTimeout(() => {
    process.exit(0)
  }, 3000)
}

function DeleteFolder(removePath) {
  if (fs.existsSync(removePath)) {
    deleteFolder(removePath)
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

const start = () => {
  const list = [
    {
      type: 'list',
      message: '选择要操作的文件夹:',
      name: 'OperationType',
      choices: [
        {
          name: 'dist',
        },
        {
          name: 'dist-electron',
        },
      ],
    },
  ]
  inquirer.prompt(list).then((r) => {
    if (r.OperationType == 'dist') {
      removeDist()
    } else if (r.OperationType == 'dist-electron') {
      removeDistElectron()
    }
  })
}

const removeDist = () => {
  const distPath = path.resolve(__dirname, '../dist')

  if (!isDistExist(distPath)) {
    return exitProcess('当前路径下不存在 `dist` 文件夹，3秒后自动退出', 'fail')
  }

  const dists = forEachDist(distPath)
  if (!Array.isArray(dists)) {
    return exitProcess('`dist` 文件夹为空，3秒后自动退出', 'succeed')
  }

  const removeListDist = [
    {
      type: 'checkbox',
      message: '选择要删除的文件夹:',
      name: 'removeDists',
      choices: dists.map((item) => ({ name: item })),
    },
  ]

  inquirer.prompt(removeListDist).then(async (answers) => {
    if (answers.removeDists.length == 0) {
      return exitProcess('未选择任何文件夹，3秒后自动退出', 'fail')
    }

    let r = await inquirer.prompt([
      {
        type: 'confirm',
        message: `将要删除以下文件夹\n ${answers.removeDists} \n 是否继续？`,
        name: 'isDelete',
        default: true,
      },
    ])

    if (!r.isDelete) {
      return exitProcess('已取消删除，3秒后自动退出')
    }

    answers.removeDists.forEach((p) => {
      const removePath = path.resolve(__dirname, `../dist/${p}`)
      DeleteFolder(removePath)
    })
    return exitProcess('删除成功，3秒后自动退出', 'succeed')
  })
}
const removeDistElectron = () => {
  const distElectron = path.resolve(__dirname, '../dist-electron')

  const dist_electrons = forEachDist(distElectron)
  if (!Array.isArray(dist_electrons)) {
    return exitProcess('`dist-electron` 文件夹为空，3秒后自动退出', 'succeed')
  }
  const removeListDistElectron = [
    {
      type: 'checkbox',
      message: '选择要删除的文件夹:',
      name: 'removeDistsElectron',
      choices: dist_electrons.map((item) => ({ name: item })),
    },
  ]
  if (!isDistExist(distElectron)) {
    return exitProcess('当前路径下不存在 `dist-electron` 文件夹，3秒后自动退出', 'fail')
  }
  inquirer.prompt(removeListDistElectron).then(async (answers) => {
    if (answers.removeDistsElectron.length == 0) {
      return exitProcess('未选择任何文件夹，3秒后自动退出', 'fail')
    }

    let r = await inquirer.prompt([
      {
        type: 'confirm',
        message: `将要删除以下文件夹\n ${answers.removeDistsElectron} \n 是否继续？`,
        name: 'isDelete',
        default: true,
      },
    ])

    if (!r.isDelete) {
      return exitProcess('已取消删除，3秒后自动退出')
    }

    answers.removeDistsElectron.forEach((p) => {
      const removePath = path.resolve(__dirname, `../dist-electron/${p}`)
      DeleteFolder(removePath)
    })
    return exitProcess('删除成功，3秒后自动退出', 'succeed')
  })
}

start()
