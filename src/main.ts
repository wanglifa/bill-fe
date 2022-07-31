import { createApp } from 'vue'
import { createRouter } from 'vue-router';
import { routes } from './config/routes';
import {App} from './App';
import { history } from './shared/history';
import '@svgstore';
import { http } from './shared/Http';
import { mePromise, fetchMe } from './shared/me';

const router = createRouter({
  history,
  routes,
})

fetchMe()

router.beforeEach(async (to, from) => {
  if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path.startsWith('/start')) {
    return true
  } else {
    const path = await mePromise!.then(() => true, () => '/sign_in?return_to=' + to.path)
    console.log(path, 'path')
    return path
  }
})
const app = createApp(App)
app.use(router)
app.mount('#app')
