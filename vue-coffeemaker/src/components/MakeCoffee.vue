<template>
    <div>
    <b-card>
        <template v-slot:header>
            <h3>Make Coffee</h3>
        </template>
        <b-form @submit="onSubmit" v-if="show">
      <b-card>
        <b-alert :show="loading" variant="info">Loading existing recipes...</b-alert>
        <b-form-radio 
          :show="!loading"
          required 
          v-for="recipe in recipes" 
          v-bind:key="recipe.id" 
          v-model="selectedRecipe" 
          :value="recipe.id">
            {{recipe.name}}
        </b-form-radio>
        <b-card-text v-if="recipes.length==0 && !loading">No recipes found.</b-card-text>
      </b-card>
      <b-form-group id="input-group-1">
        <b-form-input inline required type="number" v-model="payment" placeholder="Enter payment amount here"></b-form-input>
        <b-form-invalid-feedback :state="validatePrice">
            Amount must be greater than 0.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="info">Make Coffee</b-button>
    </b-form>
    <b-card body-bg-variant="success" v-if="!loading && submitted && success">Coffee made. Enjoy!</b-card>
    <b-card body-bg-variant="danger" v-if="!loading && submitted && !success">Error while making coffee.</b-card>
    </b-card>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data () {
    return {
      selectedRecipe: '',
      loading: true,
      payment: '',
      model: {},
      recipes: [],
      inventory: [],
      show: true,
      submitted: false,
      success: false
    }
  },
  created () {
    this.refreshRecipeList();
  },
  computed: {
    validatePrice () {
      return this.payment > 0;
    }
  },
  methods: {
    async refreshRecipeList () {
      this.loading = true;
      this.recipes = await api.getRecipes();
      this.inventory = await api.getInventory();
      this.loading = false;
      this.selected = '';
    },
    async makeCoffee () {
      this.submitted = true;
      this.success = false;
      this.loading = true;
      const tempRec = await api.getRecipe(this.selectedRecipe);
      if ((Number)(this.payment) === (Number)(tempRec.price) &&
          (Number)(this.inventory.coffee) >= (Number)(tempRec.coffee) &&
          (Number)(this.inventory.milk) >= (Number)(tempRec.milk) &&
          (Number)(this.inventory.sugar) >= (Number)(tempRec.sugar) &&
          (Number)(this.inventory.chocolate) >= (Number)(tempRec.chocolate)) {
        const tempInv = this.inventory;
        tempInv.coffee = (Number)(tempInv.coffee) - (Number)(tempRec.coffee);
        tempInv.milk = (Number)(tempInv.milk) - (Number)(tempRec.milk);
        tempInv.sugar = (Number)(tempInv.sugar) - (Number)(tempRec.sugar);
        tempInv.chocolate = (Number)(tempInv.chocolate) - (Number)(tempRec.chocolate);
        await api.updateInventory(tempInv);
        await this.refreshRecipeList();
        this.success = true;
      }
      this.loading = false;
    },
    onSubmit (evt) {
      evt.preventDefault();
      this.makeCoffee();
    }
  }
}
</script>