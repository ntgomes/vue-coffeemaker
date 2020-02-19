<template>
  <div>
    <b-card body-bg-variant="info">
      <template v-slot:header>
        <h3>Edit a Recipe</h3>
      </template>
      <b-card>
        <b-alert :show="loading" variant="info">Loading existing recipes...</b-alert>
        <b-form-radio 
          :show="!loading" 
          v-for="recipe in recipes" 
          v-bind:key="recipe.id" 
          v-model="selected" 
          :value="recipe.id">
            {{recipe.name}}
        </b-form-radio>
        <b-card-text v-if="recipes.length==0 && !loading">No recipes found.</b-card-text>
      </b-card>
      <b-card v-if="selected!=''">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
                id="input-1"
                v-model="model.name"
                type="text"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Price:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="model.price"
                type="number"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validatePrice">
                Amount must be greater than 0.
            </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-3" label="Coffee:" label-for="input-3">
            <b-form-input
                id="input-3"
                v-model="model.coffee"
                type="number"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validateCoffee">
                Amount must be greater than 0.
            </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-4" label="Milk:" label-for="input-4">
            <b-form-input
                id="input-4"
                v-model="model.milk"
                type="number"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validateMilk">
                Amount must be greater than 0.
            </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-5" label="Sugar:" label-for="input-5">
            <b-form-input
                id="input-5"
                v-model="model.sugar"
                type="number"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validateSugar">
                Amount must be greater than 0.
            </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-6" label="Chocolate:" label-for="input-6">
            <b-form-input
                id="input-6"
                v-model="model.chocolate"
                type="number"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validateChocolate">
                Amount must be greater than 0.
            </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" variant="warning">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-card>
      <b-card body-bg-variant="success" v-if="!loading && submitted && success">Recipe successfully edited.</b-card>
      <b-card body-bg-variant="danger" v-if="!loading && submitted && !success">Recipe edit failure. See console.</b-card>
    </b-card>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data () {
    return {
      selected: '',
      loading: true,
      model: {},
      recipes: [],
      show: true,
      submitted: false,
      success: false
    }
  },
  watch: {
    async getSelected () {
      this.model = await api.getRecipe(this.selected);
    }
  },
  created () {
    this.refreshRecipeList();
  },
  computed: {
    async getSelected () {
      return this.selected;
    },
    validatePrice () {
      return this.model.price > 0;
    },
    validateCoffee () {
      return this.model.coffee > 0;
    },
    validateMilk () {
      return this.model.milk > 0;
    },
    validateSugar () {
      return this.model.sugar > 0;
    },
    validateChocolate () {
      return this.model.chocolate > 0;
    }
  },
  methods: {
    async refreshRecipeList () {
      this.loading = true;
      this.recipes = await api.getRecipes();
      this.loading = false;
      this.selected = '';
    },
    async editSelectedRecipe () {
      this.submitted = true;
      await api.editRecipe(this.selected, this.model);
      await this.refreshRecipeList();
      this.success = true;
    },
    onSubmit (evt) {
      evt.preventDefault();
      this.editSelectedRecipe();
    },
    onReset (evt) {
      evt.preventDefault();
      // Reset our form values
      this.model.name = '';
      this.model.price = '';
      this.model.coffee = '';
      this.model.milk = '';
      this.model.sugar = '';
      this.model.chocolate = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      this.submitted = false;
    }
  }
}
</script>