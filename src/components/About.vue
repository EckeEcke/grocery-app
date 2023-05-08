<template>
  <div class="px-0 rounded no-br-mobile border-0 mx-auto mb-5 about-container">
    <div class="card bg-white border-0">
      <div class="card-header bg-dark no-br-mobile">
        <h3 class="text-warning m-2 p-2">About</h3>
      </div>
      <div class="card-body p-4">
          <div class="p-3">
              <p>This meal planner is a single page application I built in Vue.js. It combines the planning of upcoming meals and groceries.</p>
          <img src="../assets/logo.png" class="vue-logo mt-2 mb-4" />
          <p><b>Features included:</b></p>
          
          <ul class="list-about">
              <li>add/remove dishes from your own cookbook (saved in local storage) to your meal plan</li>
              <li>add a list of ingredients to a cookbook entry</li>
              <li>push dishes from your cookbook into your meal plan</li>
              <li>create a grocery list</li>
              <li>add new items to your list</li>
              <li>push ingredients from your meal plan directly into your grocery list</li>
              <li>add items from your item list</li>
              <li>add random recipes (received via API) including ingredients directly to your cookbook</li>
              <li>konami code 😉</li>
          </ul>
          </div>
          
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
<style scoped>
    .about-container {
      position: sticky;
      top: 2rem;
    }
    .list-about, p {
        text-align: left;
    }
    .list-about li {
        list-style-type: disc;
    }
    .vue-logo {
        max-width: 30%;
    }
</style>