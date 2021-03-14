<template>
  <div class="col-lg-5 bg-light py-4 px-1 rounded mw-90 mb-5" style="max-width: 90vw">
    <h3>Cook Book</h3>
    <p class="mt-4">Click a dish to add it to your meal list</p>
    <div class="container my-5">
      <div class="row justify-content-center my-1" v-for="dish in this.listData" :key="dish.id">
      <div class="col-10 col-md-11 bg-light text-nowrap overflow-hidden px-0">
        <button class="btn btn-outline-success w-100" :key="dish.id" @click="someFunction(listData,dish.id)" >
          {{ dish.name }}
        </button>
      </div>
      <div class="col-1">
        <button class="btn btn-danger align-bottom" @click="function2(listData,dish.id)">X</button>
        </div>
      </div>
    </div>
    
    <button class="btn btn-outline-secondary mb-5" @click="this.function2">
      🗑 Delete all
    </button>
    
    <br>
    <button class="btn btn-primary" @click="this.function">Back to Meal Planner</button>
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