import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { setupStore } from '@/store';
import { setupDirective } from '@/directive';
import ElementPlus from 'element-plus';

// 粒子背景 新增文件src/env.d.ts 写入 declare module 'particles.vue3'; 解决ts冲突问题
import Particles from 'particles.vue3';

// 路由守卫
import '@/permission';

// 本地SVG图标
import 'virtual:svg-icons-register';

// 国际化
import i18n from '@/lang/index';

// 样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/index.scss';
import 'uno.css';

const app = createApp(App);
// 全局注册 自定义指令(directive)
setupDirective(app);
// 全局注册 状态管理(store)
setupStore(app);

app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(Particles)
app.mount('#app');
