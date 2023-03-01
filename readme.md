## 目录结构

- `config` 配置文件，目前配置了反向代理。
- `packages` 工作区，放项目。
- `public` 静态资源，会原封不动的放入 `dist` 文件夹内。
- `scripts` 脚本，目前有打包的脚本。

## 注意

1. 本项目采用 `monorepo` 的方式进行仓库的管理，基于 `yarn` 的 `workspaces`。
2. **请全程使用 `yarn` 进行操作**，无论是安装依赖还是启动项目。 安装 `yarn`: `npm i yarn -g`。检查是否安装成功：`yarn -v`
3. 因为启用了 `workspaces`, `packages` 目录下面模块的依赖统一提升到根目录，安装依赖时，请携带 `-W` 参数，允许在工作空间根目录安装一个包。
   例如：
   - 你需要添加 `react` 到你的生成环境依赖中， `yarn add react -W `。
   - 需要添加 `typescript` 到你的开发环境依赖中， `yarn add typescript -WD `。

## 环境变量

- 在 `packages` 下面项目的根目录中创建 `.env.dev`， `.env.prod`，`.env.mock` 三个文件，分别代表开发环境，生产环境和模拟环境所使用的环境变量。
- 注意：
      - 只有 `NODE_ENV`，`BASE_URL` 和以 `VUE_APP_` 开头的变量才能注入到客户端的代码中，详情见 Vue CLI 官网。
      - 在打包成 `electron` 时，请不要乱修改 `process.env.NODE_ENV` ，`process.env.NODE_ENV` 的值只能为 `development`，`production` 或者 `none`, 因为最终会映射到 `webpack` 的配置中。

## 新建一个模块

1. 配置 `ts` 别名，在 `tsconfig.paths.json` 增加一条别名，例如：`@monitor/*`，请记住这个别名。
2. 配置 `webpack` 别名，在 `vue.config.js` 中，找到 `chainWebpack` 项，在 `config.resolve.alias` 后面再添加刚刚记住的别名。
3. 这样配置后，你能在本模块使用 `@monitor/*` 这样的别名。
4. 由于采用了 `monorepo`，`packages` 目录下面的每一个项目都需要包含一个 `package.json`, 这边统一将 `name` 项改成 `@gefei/**`。注意：统一名称为 `@gefei/**` 后，你能在 `packages` 目录下的其他项目中，通过 `@gefei/**` 直接找到这个项目，方便使用其他项目中的组件和功能。
5. `packages` 下的 `share` 文件夹 用来存放在其他项目中都可能用到的组件或 hooks 等公共部分，为了方便，现已经配置 `@share` 别名，你能通过 `@share` 直接访问到 `share` 目录。
6. 在 `share` 文件下更新了组件或hooks后，请同步更新 `readme.md`, 让大家知道有哪些东西能够公用。

## 接口和反向代理

1. 根目录下面的 `config` 文件夹 的 `server.ts` 用来配置 `proxy`。
2. 每个项目的目录下面应该存在一个 `api` 文件夹。
   `api` 文件夹的目录应该如下:
   - `index.ts` 导出该目录下的所有API;
   - `request.ts` 封装 `axios`，导出 `axios` 的实例;
   - 其他文件，从 `request.ts` 中拿到 `axios` 的实例，进一步进行详细的配置，导出接口函数。
3. 每个导出的接口请给定类型，放置在 `types/api` 文件下面。如果接口变动，请先修改对应的接口类型。
4. 注意：
   - 从环境变量文件中拿到例如 `VUE_APP_URL_PREFIX` 的变量，代表 `URL` 的前缀，作为 `axios` 的 `baseURL`。
   - 如果一个项目中存在多个地址，那就需要在环境变量文件中配置多个地址，然后从 `request.ts` 中导出多个 `axios` 实例，不同的接口使用不同的 `axios` 实例。
   - 反向代理就配置这个 `VUE_APP_URL_PREFIX` 所指的变量。
5. 这样我们就能区分 `dev` 环境和 `mock` 等环境了，具体用法请看项目代码。

## 脚本
- 总体上分为了 `web` 和 `electron` 两大块。
  1. `dev`
  2. `dev:electron`
  3. `mock`
  4. `mock:electron`
  5. `build`
  6. `build:electron`
  7. `delete`: 对 `dist` 和 `dist-electron` 文件夹进行删除操作。

## 换肤

- 所有项目的主题围绕着 `ant-design-vue` 的主题进行变化，`ant-design-vue` 提供了一系列的 `css变量`。
- 你能在项目的 `style` 文件夹下面看到一个 `global.css` 文件， 这里面的变量同属于一个主题色，默认我们选择 `--ant-primary-color`，如果需要使用其他不同阶梯的颜色，自己酌情选择其他变量。
- 使用方法：`var(--ant-primary-color, ***)`
- 注意：由于这些 `css变量` 为 `ant-design-vue` 动态生成，并不能保证某个变量一定存在，因此 `var` 函数的第二个参数要给上，在第一个变量不存在时，能够使用第二个颜色。

## 代码风格

- 建议使用 `Prettier` 进行代码风格的统一。
- 在 `VScode` 中安装插件 `Prettier`。
- 项目根目录已经建好了 `prettier.config.js`, 确定格式化的风格。
- 如果你不想在保存时自动格式化代码，可以打开根目录下的 `.vscode` 文件夹, 找到 `settings.json` 下的 `editor.formatOnSave` 项，改成 `false`，针对 `.vue` 文件，找到 `[vue]` 项，将 `editor.formatOnSave` 改成 `false`。
- 如果修改了配置文件，请让 `git` 忽略掉 `settings.json`。

## 更换插件

- 切换到 `Vue3` 开发，需要将 `VScode` 中 `Vetur` 禁用掉，同时安装 `Volar`。

