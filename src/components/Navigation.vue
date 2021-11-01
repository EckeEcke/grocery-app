<template>
<div>
  <div class="backdrop" @click="() => this.$emit('close')"></div>
    <nav class="navbar bg-dark" style="width: 100vw; max-width: 500px; height: 100vh; position: fixed; right: 0; top: 0">
    <div>
    <ul>
      <li class="py-3"><a href="https://eckeecke.github.io/">Home</a></li>
      <li class="py-3"><a href="https://nifty-hopper-c1da01.netlify.app/">React Travel Blog</a></li>
      <li class="py-3"><a href="https://eckeecke.github.io/shooter">JS Space Shooter</a></li>
      <li class="py-3"><a href="https://eckeecke.github.io/pong">JS Pong</a></li>
      <li class="py-3"><a href="https://adoring-galileo-71fde2.netlify.app/">React Todo App</a></li>
      <li class="py-3"><a href="https://eckeecke.github.io/templelooter">Temple Looter</a></li>
    </ul>
    <button
      id="toggle-nav-BTN"
      class="btn text-white"
      style="font-size: 2.5em"
      @click="() => this.$emit('close')"
    >
      <font-awesome-icon :icon="['fas', 'times']" />
    </button>
    </div> 
  </nav>
</div>

</template>


<script>
export default {
  name: "Navbar",
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
.navbar {
  z-index: 1;
}
.backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    top: 0;
    left: 0;
    z-index: 1;
}
</style>