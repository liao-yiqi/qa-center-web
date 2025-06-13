import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router' //路由文件
import store from './store' //状态管理文件
import elementIcons from '@/components/SvgIcon/svgIcon.ts'
import SvgIcon from '@/components/SvgIcon/index.vue'

import 'virtual:svg-icons-register' //注册svg图标

const app = createApp(App)
app.use(ElementPlus)
app.use(router) //使用路由
app.use(store) //使用状态管理
app.use(elementIcons) //使用图标组件
app.component('SvgIcon', SvgIcon)
app.mount('#app')
