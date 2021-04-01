<template>
  <div class="col-sm-12 col-md-10 col-lg-5 px-3 py-4 bg-white rounded mw-90 mb-5" style="max-width: 90vw;">
    <h3>Grocery List</h3>
    <div class="container my-5">
      <div v-if="this.plannedItems.length == 0">Add new items or choose from your item list</div>
      <div class="row my-1 justify-content-center" v-for="groceryItem in this.plannedItems" :key="groceryItem.id">
      <div class="col-10 col-md-11 bg-light pt-2 px-0 mx-0 text-nowrap overflow-hidden">
        <span>{{ groceryItem.name }}</span>
      </div>
      <div class="col-1 px-0 mx-0">
        <button class="btn btn-success align-bottom" @click="function2(groceryItem.name)">✔</button>
        </div>
      </div>
    </div>
    <img class="illustration mb-5" src="../assets/grocery-illustration.svg">
      <br>
    <button class="btn btn-primary" @click="this.function3"><font-awesome-icon :icon="['fas','shopping-cart']" />Item List</button>
  </div>
</template>


<script>
export default {
  name: "Grocerylist",
  props: {
    groceryList: {
      type: Array,
    },
    function2: {
        type: Function
    },
    function3: {
      type: Function
    }
  },
  data() {
    return {
      listData: this.groceryList,
    };
  },
  computed: {
    plannedItems: function(){
      return this.groceryList.filter(item => item.planned == true);
    }
 }
};
</script>

<style scoped>

  @media (max-width: 500px){
    span, button {
      font-size: 0.9em;
    }
  }
</style>