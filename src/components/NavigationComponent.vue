<template>
<div>
  <div class="backdrop" @click="() => this.$emit('close')"></div>
    <nav class="sidebar bg-dark">
    <div>
    <ul>
      <li class="py-2"><a href="https://eckeecke.github.io/">Home</a></li>
      <li class="py-2"><a href="https://nifty-hopper-c1da01.netlify.app/">React Travel Blog</a></li>
      <li class="py-2"><a href="https://eckeecke.github.io/shooter">JS Space Shooter</a></li>
      <li class="py-2"><a href="https://eckeecke.itch.io/school-fight">School Fight</a></li>
      <li class="py-2"><a href="https://eckeecke.github.io/pong">JS Pong</a></li>
      <li class="py-2"><a href="https://adoring-galileo-71fde2.netlify.app/">React Todo App</a></li>
      <li class="py-2"><a href="https://eckeecke.github.io/templelooter">Temple Looter</a></li>
    </ul>
    <button
      id="sidebar-btn-close"
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


<script scoped>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
  #toggle-nav-BTN {
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
}
#sidebar-btn-close {
  position: fixed;
  top: 12px;
  right: 2px;
}
    ul {
        width: 100vw;
        max-width:450px;
        margin: 50px auto;
    }

    li {
      width: 80%;
      margin: 1rem auto;
      color: white;
      font-size: 1.5rem;
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
.sidebar {
  z-index: 10;
  padding-top: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100vw; 
  max-width: 500px; 
  height: 100vh; 
  position: fixed; 
  right: -100%; 
  top: 0;
  transition: right 0.3s ease;
  animation: slide-in 0.3s linear;
  animation-fill-mode: forwards;
}

@media (min-width: 576px){
  .sidebar {
    padding-top: 4rem;
  }
  li {
    font-size: 2rem;
  }
}

@keyframes slide-in {
  from {
    right: -100%;
  } to {
    right: 0;
  }
}
</style>