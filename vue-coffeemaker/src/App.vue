<template>
  <div id="app">
    <b-row>
      <b-col>
        <h1 class='cm-home-header'>Coffee Maker</h1>
        <h4>Available Options</h4>
        <ul>
          <li>
            <router-link to="/about">About CoffeeMaker</router-link>
          </li>
          <li>
            <router-link to="/editInventory">Update Inventory</router-link>
          </li>
          <li>
            <router-link to="/addRecipe">Add a Recipe</router-link>
          </li>
          <li>
            <router-link to="/deleteRecipe">Delete Recipe</router-link>
          </li>
          <li>
            <router-link to="/editRecipe">Edit a Recipe</router-link>
          </li>
          <li>
            <router-link to="/makeCoffee">Make Coffee</router-link>
          </li>
        </ul>
        <hr />
      </b-col>
      <b-col cols="8">
        <template v-if="$route.matched.length">
          <router-view></router-view>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #2c3e50;
  }

  #app {
    padding: 0 20px;
    display: stack;
  }

  ul {
    line-height: 1.5em;
    padding-left: 1.5em;
  }

  a {
    color: #7f8c8d;
    text-decoration: none;
  }

  a:hover {
    color: #4fc08d;
  }

  .cm-home-header{
    padding-top: 0.2em;
  }
</style>