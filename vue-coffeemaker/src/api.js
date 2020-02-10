import Vue from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
});

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    const accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => req.data)
  },
  // API calls for Inventory
  getInventory () {
    return this.execute('get', '/inventory');
  },
  updateInventory (inventoryData) {
    return this.execute('put', '/inventory/', inventoryData);
  },
  // API calls for Recipe
  getRecipes () {
    return this.execute('get', '/recipes');
  },
  getRecipe (id) {
    return this.execute('get', `/recipes/${id}`);
  },
  createRecipe (recipe) {
    return this.execute('post', '/recipes', recipe);
  },
  deleteRecipe (id) {
    return this.execute('delete', `/recipes/${id}`);
  },
  editRecipe (id, newRecipe) {
    return this.execute('put', `/recipes/${id}`, newRecipe);
  }
}
