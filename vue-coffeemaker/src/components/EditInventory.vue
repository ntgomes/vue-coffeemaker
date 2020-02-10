<template>
  <div>
    <b-card>
    <template v-slot:header>
      <h3>View Inventory</h3>
    </template>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <div v-if="!loading">
      <b-card-text>Coffee: {{ inventory.coffee }}&emsp;Milk: {{ inventory.milk }}&emsp;Sugar: {{ inventory.sugar }}&emsp;Chocolate: {{inventory.chocolate}}</b-card-text>
    </div>
    </b-card>
    <b-card 
      body-bg-variant="info">
      <template v-slot:header>
        <h3>Edit Inventory Form</h3>
      </template>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Coffee:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="model.coffee"
            type="number"
            required
            placeholder="Enter amount of coffee to add"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateCoffee">
            Amount must be greater than or equal to 0.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-2" label="Milk:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="model.milk"
            type="number"
            required
            placeholder="Enter amount of milk to add"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateMilk">
            Amount must be greater than or equal to 0.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-3" label="Sugar:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="model.sugar"
            type="number"
            required
            placeholder="Enter amount of sugar to add"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateSugar">
            Amount must be greater than or equal to 0.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-4" label="Chocolate:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="model.chocolate"
            type="number"
            required
            placeholder="Enter amount of chocolate to add"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateChocolate">
            Amount must be greater than or equal to 0.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="warning">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card body-bg-variant="success" v-if="!loading && submitted && success">Inventory successfully edited.</b-card>
      <b-card body-bg-variant="danger" v-if="!loading && submitted && !success">Inventory edit failure. See console.</b-card>
    </b-card>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data () {
    return {
      loading: false,
      inventory: [],
      model: {},
      show: true,
      submitted: false,
      success: false
    }
  },
  async created () {
    await this.refreshInventory();
  },
  computed: {
    validateCoffee () {
      return this.model.coffee >= 0;
    },
    validateMilk () {
      return this.model.milk >= 0;
    },
    validateSugar () {
      return this.model.sugar >= 0;
    },
    validateChocolate () {
      return this.model.chocolate >= 0;
    }
  },
  methods: {
    async refreshInventory () {
      this.loading = true;
      this.inventory = await api.getInventory();
      this.loading = false;
    },
    async populateInventoryToEdit (inventory) {
      this.model = Object.assign({}, inventory);
    },
    async editInventory () {
      // First, add the model's amount to the existing inv amount
      this.model.coffee = (String)((Number)(this.model.coffee) +
       (Number)(this.inventory.coffee));
      this.model.milk = (String)((Number)(this.model.milk) +
       (Number)(this.inventory.milk));
      this.model.sugar = (String)((Number)(this.model.sugar) +
       (Number)(this.inventory.sugar));
      this.model.chocolate = (String)((Number)(this.model.chocolate) +
       (Number)(this.inventory.chocolate));

      // Then perform the PUT call on the database
      await api.updateInventory(this.model);
      this.model = {}; // reset form
      this.submitted = true;
      await this.refreshInventory();
      this.success = true;
    },
    onSubmit (evt) {
      evt.preventDefault();
      this.editInventory();
    },
    onReset (evt) {
      evt.preventDefault();
      // Reset our form values
      this.model.coffee = '';
      this.model.milk = '';
      this.model.sugar = '';
      this.model.chocolate = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
}
</script>
