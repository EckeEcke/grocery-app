<template>
  <div class="col-lg-4 bg-light p-4 rounded mw-90 mb-5" style="max-width: 90vw">
    <h3>Grocery List</h3>
    <ul>
      <li v-for="groceryItem in this.listData" :key="groceryItem.id">
        <button class="btn btn-outline-success m-2 w-75" :key="groceryItem.id" @click="function2(listData,groceryItem.id)">
          {{ groceryItem.name }}
        </button>
      </li>
    </ul>
    <button class="btn btn-outline-secondary mt-4" @click="this.function">
      🗑 Delete all
    </button>
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
