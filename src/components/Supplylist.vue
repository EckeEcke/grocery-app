<template>
  <div class="col-sm-12 col-md-10 col-lg-5 bg-white py-4 px-2 rounded mw-90 mb-5" style="max-width: 90vw">
    <h3>Supply List</h3>
    <p class="mt-4">Click an item to add it to your grocery list</p>
    <div class="container my-5">
      <div class="row my-1 justify-content-center" v-for="item in this.sortedItems" :key="item.id">
      <div class="col-10 col-md-11 text-nowrap overflow-hidden  px-0 mx-0">
        <button class="btn w-100 px-0 mx-0" :class="item.planned ? 'btn-success' : 'btn-outline-secondary'" :disabled="item.planned" :key="item.id" @click="someFunction(item.id)" >
          {{ item.name }}
        </button>
      </div>
      <div class="col-1 px-0 mx-0">
        <button class="btn btn-secondary align-bottom" @click="function3(listData,item.id)">X</button>
        </div>
      </div>
    </div>
    <button class="btn btn-primary mb-1" @click="this.function">← Grocery List</button>
    <button class="btn btn-secondary mx-2 mb-1" @click="this.function2">
      🗑 Delete all
    </button>
    
  </div>
</template>

<script>
export default {
  name: "Supplylist",
  props: {
    groceryList: {
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
      listData: this.groceryList,
    };
  },
  computed: {
    sortedItems: function(){
      let sortedArray = this.listData;
      return sortedArray.sort((a,b) => 
        a.name.localeCompare(b.name))

      }
  }  

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