import Vue from 'vue';
import Router from 'vue-router';
import About from '@/components/About';
import EditInventory from '@/components/EditInventory';
import AddRecipe from '@/components/AddRecipe';
import DeleteRecipe from '@/components/DeleteRecipe';
import EditRecipe from '@/components/EditRecipe';
import MakeCoffee from '@/components/MakeCoffee';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/about', component: About },
    {
      path: '/editInventory',
      component: EditInventory
    },
    {
      path: '/addRecipe',
      component: AddRecipe
    },
    {
      path: '/deleteRecipe',
      component: DeleteRecipe
    },
    {
      path: '/editRecipe',
      component: EditRecipe
    },
    {
      path: '/makeCoffee',
      component: MakeCoffee
    }
  ]
});

export default router;
