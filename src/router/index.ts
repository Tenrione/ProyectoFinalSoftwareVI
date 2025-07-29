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
    component: () => import('../views/PantallaBienvenida.vue')
      
  },
  {
  path:'/usuarioUI/Login',
  component: () => import('../views/Login.vue')
},
{
  path:'/usuarioUI/Registro',
  component: () => import('../views/Registro.vue')
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  // Get the authentication status from Preferences
  const { value } = await Preferences.get({ key: 'loginCreado' });
  const isAuthenticated = value === 'true'; // Convert 'true' string to boolean true

  // Check if the route requires authentication (e.g., your Dashboard)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Scenario 1: User is trying to access a protected route but is not authenticated
  if (requiresAuth && !isAuthenticated) {
    console.log("Navigation Guard: Route requires authentication, but user is not logged in. Redirecting to Welcome.");
    next('/usuarioUI/PantallaBienvenida'); // Redirect to your welcome/login page
  }
  // Scenario 2: User is authenticated and trying to access the Welcome/Login page
  else if (!requiresAuth && isAuthenticated && to.path === '/usuarioUI/PantallaBienvenida') {
    console.log("Navigation Guard: User is logged in and trying to access Welcome. Redirecting to Dashboard.");
    next('/tabs/Dashboard'); // Redirect to the dashboard
  }
  // Scenario 3: All good, proceed with navigation
  else {
    console.log(`Navigation Guard: Allowing navigation to ${to.path}.`);
    next(); // Allow the navigation to proceed
  }
});
export default router

