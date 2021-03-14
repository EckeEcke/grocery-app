<template>
  <div class="col-sm-12 col-md-10 col-lg-5 bg-white py-4 px-2 rounded mw-90 mb-5" style="max-width: 90vw">
    <h3>Cook Book</h3>
    <p class="mt-4">Click a dish to add it to your meal list</p>
    <div class="container my-5">
      <div class="row my-1 justify-content-center" v-for="dish in this.listData" :key="dish.id">
      <div class="col-10 col-md-10 text-nowrap overflow-hidden  px-0 mx-0">
        <button class="btn btn-outline-success w-100 px-0 mx-0" :key="dish.id" @click="someFunction(listData,dish.id)" >
          {{ dish.name }}
        </button>
      </div>
      <div class="col-1 px-0 mx-0">
        <button class="btn btn-secondary align-bottom" @click="function3(listData,dish.id)">X</button>
        </div>
      </div>
    </div>
    <button class="btn btn-primary mb-1" @click="this.function">← Meal Plan</button>
    <button class="btn btn-secondary mx-2 mb-1" @click="this.function2">
      🗑 Delete all
    </button>
    
  </div>
</template>

<script>
export default {
  name: "Cookbook",
  props: {
    cookBook: {
      type: Array,
    },
    mealList: {
        type: Array,
    },
    function: {
      type: Function,
    },
    function2: {
        type: Function,
    },
    function3: {
        type: Function,
    },
    someFunction: {
        type: Function
    }
  },
  data() {
    return {
      listData: this.cookBook,
    };
  },
};
</script>

<style scoped>
p {
    font-size: 1em;
}

@media (max-width: 500px){
    button {
      font-size: 0.9em;
    }
  }
</style>