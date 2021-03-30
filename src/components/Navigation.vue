<template>
  <nav class="navbar bg-dark" style="width: 100vw; max-width: 500px; height: 100vh; position: fixed; right: 0; top: 0">
    <div>
    <ul>
      <li class="py-3"><a href="https://eckeecke.github.io/">Home</a></li>
      <li class="py-3"><a href="https://nifty-hopper-c1da01.netlify.app/">React Travel Blog</a></li>
      <li class="py-3"><a href="https://eckeecke.github.io/shooter.html">JS Space Shooter</a></li>
      <li class="py-3"><a href="https://eckeecke.github.io/pong.html">JS Pong</a></li>
      <li class="py-3"><a href="https://adoring-galileo-71fde2.netlify.app/">React Todo App</a></li>
      <li class="py-3"><a href="https://eckeecke.github.io/newgame.html">Drawing App</a></li>
      <li class="py-3"><a href="https://eckeecke.github.io/templelooter.html">Temple Looter</a></li>
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
        margin-top: 50px;
        margin-left: 2px;
    }

    li {
      width: 80%;
      margin: 0 auto;
      color: white;
      border-bottom: 1px solid orange;
      font-size: 3vh;
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