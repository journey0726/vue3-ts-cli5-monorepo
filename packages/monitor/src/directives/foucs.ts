import { Directive, App } from 'vue'

const focus: Directive = {
  mounted(el, _, vnode) {
    (el as HTMLInputElement).focus()
  }
}

export default function (app: App) {
  app.directive('focus', focus)
}