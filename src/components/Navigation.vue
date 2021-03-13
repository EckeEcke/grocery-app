<template>
  <nav class="navbar bg-dark" style="width: 100vw; max-width: 500px; min-height: 100%; position: absolute; right: 0; top: 0">
    <div>
    <ul>
      <li class="px-5 py-3 bg-light mb-1 ml-5">Home</li>
      <li class="p-5 py-3 bg-light mb-1 ml-2">React Travel Blog</li>
      <li class="p-5 py-3 bg-light mb-1">JS Space Shooter</li>
      <li class="p-5 py-3 bg-light mb-1">JS Pong</li>
      <li class="p-5 py-3 bg-light mb-1">React Todo App</li>
      <li class="p-5 py-3 bg-light mb-1">Drawing App</li>
      <li class="p-5 py-3 bg-light mb-1">Temple Looter</li>
      <li class="p-5 py-3 bg-light mb-1">Vue Meal Planner</li>
    </ul>
    </div>
  </nav>
</template>


<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
    ul {
        width: 99vw;
        max-width: 490px;
        margin-top: 75px;
        margin-left: 2px;
    }

    li {
      width: 100%;
      margin: 0 auto;
    }

</style>