<template>
  <div class="col-sm-12 col-md-10 col-lg-5 px-2 py-4 bg-white rounded mw-90 mb-5" style="max-width: 90vw;">
    <h3>Meal Plan</h3>
    <div class="container my-5">
      <div class="row my-1 justify-content-center" v-for="mealItem in this.listData" :key="mealItem.id">
      <div class="col-10 col-md-11 bg-light pt-2 px-0 mx-0 text-nowrap overflow-hidden">
        <span>{{ mealItem.name }}</span>
      </div>
      <div class="col-1 px-0 mx-0">
        <button class="btn btn-secondary align-bottom" @click="function2(listData,mealItem.id)">X</button>
        </div>
      </div>
    </div>

    <button class="btn btn-primary mb-1" @click="this.function3">📖 Cook Book</button>
    
    <button class="btn btn-secondary mb-1 mx-2" @click="this.function">🗑 Delete list</button>
  </div>
</template>


<script>
export default {
  name: "Meallist",
  props: {
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
  },
  data() {
    return {
      listData: this.mealList,
    };
  },
};
</script>

<style scoped>

  @media (max-width: 500px){
    span, button {
      font-size: 0.9em;
    }
  }
</style>