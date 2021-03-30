<template>
  <nav class="navbar bg-dark" style="width: 100vw; max-width: 500px; height: 100vh; position: fixed; right: 0; top: 0">
    <div>
    <ul>
      <li class="p-5 py-3 mb-1"><a href="https://eckeecke.github.io/">Home</a></li>
      <li class="p-5 py-3 mb-1"><a>React Travel Blog</a></li>
      <li class="p-5 py-3 mb-1"><a>JS Space Shooter</a></li>
      <li class="p-5 py-3 mb-1"><a>JS Pong</a></li>
      <li class="p-5 py-3 mb-1"><a>React Todo App</a></li>
      <li class="p-5 py-3 mb-1"><a>Drawing App</a></li>
      <li class="p-5 py-3 mb-1"><a>Temple Looter</a></li>
      <li class="p-5 py-3 mb-1"><a>Vue Meal Planner</a></li>
    </ul>
    <button
      id="toggle-nav-BTN"
      class="btn"
      style="font-size: 2.5em"
      @click="toggleFunction"
    >
      🍔
    </button>
    </div>
  </nav>
</template>


<script>
export default {
  name: "Navbar",
  props: {
    menuShown: {
      type: Boolean
    },
    toggleFunction: {
      type: Function
    }
  },
  data() {
    return {
      burgermenuShown: this.menuShown
    }
  }
};
</script>

<style scoped>
  #toggle-nav-BTN {
  position: fixed;
  right: 2px;
  top: 2px;
}
    ul {
        width: 100vw;
        max-width:450px;
        margin-top: 60px;
        margin-left: 2px;
    }

    li {
      width: 80%;
      margin: 0 auto;
      color: white;
      border-bottom: 1px solid orange;
    }

    li:first-child {
      border-top: 1px solid orange;
    }

    a {
      text-decoration: none;
      color: white;
    }

    a:hover {
      font-weight: bolder;
    }

    li:hover {
      transition: 500ms;
      background-color: orange;
    }

</style>