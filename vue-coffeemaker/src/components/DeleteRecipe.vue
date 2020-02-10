<template>
  <div>
    <b-card>
        <template v-slot:header>
            <h3>Delete Recipe</h3>
        </template>
        <b-alert :show="loading" variant="info">Loading existing recipes...</b-alert>
        <div v-if="!loading && recipes.length > 0">
            <b-form-checkbox v-for="recipe in recipes" v-bind:key="recipe.id" v-model="selected" :value="recipe.id">
                {{recipe.name}}
            </b-form-checkbox>
            <b-button @click="deleteRecipes">Delete</b-button>
        </div>
        <div v-if="!loading && recipes.length == 0">
            <b-card-text>No recipes found.</b-card-text>
        </div>
    </b-card>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data () {
    return {
      loading: true,
      recipes: [],
      selected: [],
      submitted: false,
      success: false
    }
  },
  created () {
    this.refreshRecipeList();
  },
  methods: {
    async refreshRecipeList () {
      this.loading = true;
      this.recipes = await api.getRecipes();
      this.loading = false;
    },
    async deleteRecipes () {
      // Had to use a regular for-loop to force synchronicity
      for (let i = 0; i < this.selected.length; i += 1) {
        api.deleteRecipe(this.selected[i]).then((res) => {
          if (i === this.selected.length - 1) {
            this.refreshRecipeList();
          }
        });
      }
    }
  }
}
</script>