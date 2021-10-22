<template>
  <div class="col-sm-12 col-md-10 col-lg-5 bg-white py-4 px-2 rounded mb-5" style="max-width: 95vw">
    <h3>Supply List</h3>
    <p class="mt-4">Click an item to add it to your grocery list</p>
    <div class="container my-5">
      <transition-group name="slide-fade">
          <div class="row my-1 justify-content-center" v-for="item in this.sortedItems" :key="item.id">
      <div class="col-10 col-md-11 text-nowrap overflow-hidden  px-0 mx-0">
        <button class="btn w-100 px-0 mx-0" :class="item.planned ? 'btn-success' : 'btn-outline-secondary'" :key="item.id" @click="someFunction(item.name)" >
          {{ item.name }}
        </button>
      </div>
      <div class="col-1 px-0 mx-0">
        <button class="btn btn-outline-secondary align-bottom delete-item-btn" @click="function3(listData,item.name)"><font-awesome-icon :icon="['fas','trash-alt']" class="trash-icon-item" /></button>
        </div>
          </div>
      </transition-group>
    </div>
    <img class="illustration mb-5" src="../assets/supplylist-illustration.svg">
      <br>
    <button class="btn btn-primary mb-1" @click="this.function"><font-awesome-icon :icon="['fas','arrow-circle-left']" />Grocery List</button>
    <button class="btn btn-secondary mx-2 mb-1" @click="this.function2">
      <font-awesome-icon :icon="['fas','trash-alt']" />Delete all
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
.trash-icon-item {
  color: grey;
  margin: 0;
}
button:hover .trash-icon-item {
  color: white;
}
.btn-outline-secondary, .btn-success {
  border-radius: 0;
}
.delete-item-btn {
  border: 0;
  padding: 7px 12px;
}
@media (max-width: 500px){
    button {
      font-size: 0.9em;
    }
  }
</style>