<template>
  <div class="col-sm-12 col-md-10 col-lg-5 px-3 py-4 bg-white rounded mw-90 mb-5" style="max-width: 90vw;">
    <h3>Grocery List</h3>
    <div class="container my-4">
      <div class="row my-1 justify-content-center" v-for="groceryItem in this.listData" :key="groceryItem.id">
      <div class="col-10 col-md-11 bg-light pt-2 px-0 mx-0 text-nowrap overflow-hidden">
        <span>{{ groceryItem.name }}</span>
      </div>
      <div class="col-1 px-0 mx-0">
        <button class="btn btn-secondary align-bottom" @click="function2(listData,groceryItem.id)">X</button>
        </div>
      </div>
    </div>
    <button class="btn btn-secondary mt-4" @click="this.function">🗑 Delete list</button>
  </div>
</template>


<script>
export default {
  name: "Grocerylist",
  props: {
    groceryList: {
      type: Array,
    },
    function: {
      type: Function,
    },
    function2: {
        type: Function
    }
  },
  data() {
    return {
      listData: this.groceryList,
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