<template>
  <div>
    <b-card body-bg-variant="info">
      <template v-slot:header>
        <h3>Add a Recipe</h3>
      </template>
      <b-card v-if="submitted && success" body-bg-variant="success">Recipe added.</b-card>
      <b-card v-if="submitted && !success" body-bg-variant="danger">Error while adding recipe.</b-card>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="model.name"
            type="text"
            required
            placeholder="Enter recipe name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Price:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="model.price"
            type="number"
            required
            placeholder="Enter recipe price"
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
            placeholder="Enter amount of coffee"
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
            placeholder="Enter amount of milk"
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
            placeholder="Enter amount of sugar"
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
            placeholder="Enter amount of chocolate"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateChocolate">
            Amount must be greater than 0.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="warning">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data () {
    return {
      model: {},
      show: true,
      submitted: false,
      success: false
    }
  },
  computed: {
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
    async populateRecipeToAdd (recipe) {
      this.model = Object.assign({}, recipe)
    },
    async createRecipe () {
      await api.createRecipe(this.model);
      this.model = {}; // reset form
      this.submitted = true;
      this.success = true;
    },
    onSubmit (evt) {
      evt.preventDefault();
      this.createRecipe();
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
