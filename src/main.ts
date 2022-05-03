import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import {App} from './App';
import { Bar } from './views/Bar';
import { Foo } from './views/Foo';

const routes = [
  {
    path: '/', component: Foo
  },
  {
    path: '/about', component: Bar
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
const app = createApp(App)
app.use(router)
app.mount('#app')
