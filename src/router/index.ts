import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Preferences } from '@capacitor/preferences';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/usuarioUI/PantallaBienvenida'
    //Esto es lo que tengo que cambiar para que se vea otra pantalla al iniciar
    //Con un mounted se puede recibir un dato para que cuando este la sesion iniciada se muestre algo mas
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/Dashboard'
      },
      {
        path: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'Inventario',
        component: () => import('@/views/Inventario.vue')
      },
      {
        path: 'Usuarios',
        component: () => import('@/views/Usuarios.vue')
      },
      {
        path: 'Facturas',
        component: () => import('@/views/Facturas.vue')
      },
      {
        path: 'Perfil',
        component: () => import('@/views/Perfil.vue')
      }
    ]
  },
  {
    path: '/usuarioUI/PantallaBienvenida',
    component: () => import('@/views/PantallaBienvenida.vue')
      
  },
  {
  path:'/usuarioUI/Login',
  component: () => import('@/views/Login.vue')
},
{
  path:'/usuarioUI/Registro',
  component: () => import('@/views/Registro.vue')
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { value: token } = await Preferences.get({ key: 'token' });
  const isAuthenticated = !!token; // true si hay token guardado

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/usuarioUI/PantallaBienvenida');
  } else if (!requiresAuth && isAuthenticated && to.path === '/usuarioUI/PantallaBienvenida') {
    next('/tabs/Dashboard');
  } else {
    next();
  }
});
export default router

