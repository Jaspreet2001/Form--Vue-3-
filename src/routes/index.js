import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
console.log(routes)
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  
 })
    
export default router;