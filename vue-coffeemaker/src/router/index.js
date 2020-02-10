import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@okta/okta-vue'
import About from '@/components/About';
import EditInventory from '@/components/EditInventory';
import AddRecipe from '@/components/AddRecipe';
import DeleteRecipe from '@/components/DeleteRecipe';
import EditRecipe from '@/components/EditRecipe';
import MakeCoffee from '@/components/MakeCoffee';

Vue.use(Auth, {
  issuer: 'https://dev-881738.okta.com/oauth2/default',
  client_id: '0oa24v71hg6BByTwx4x6',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/about', component: About },
    {
      path: '/editInventory',
      component: EditInventory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addRecipe',
      component: AddRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/deleteRecipe',
      component: DeleteRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editRecipe',
      component: EditRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/makeCoffee',
      component: MakeCoffee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
