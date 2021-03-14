<template>
  <div class="col-sm-12 col-md-10 col-lg-5 px-3 py-4 bg-white rounded mw-90 mb-5" style="max-width: 90vw;">
    <h3>Meal Plan</h3>
    <div class="container my-4">
      <div class="row justify-content-center my-1" v-for="mealItem in this.listData" :key="mealItem.id">
      <div class="col-10 col-md-11 bg-light pt-2 px-0 text-nowrap overflow-hidden">
        <span>{{ mealItem.name }}</span>
      </div>
      <div class="col-1">
        <button class="btn btn-danger align-bottom" @click="function2(listData,mealItem.id)">X</button>
        </div>
      </div>
    </div>

    <button class="btn btn-primary my-2" @click="this.function3">Open Cook Book</button>
    <br>
    <button class="btn btn-outline-secondary mt-4" @click="this.function">🗑 Delete list</button>
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