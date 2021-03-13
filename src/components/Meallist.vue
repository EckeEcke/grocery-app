<template>
  <div class="col-lg-4 bg-light p-4 rounded mw-90 mb-5" style="max-width: 90vw;">
    <h3>Planned Meals</h3>
    <ul>
      <li v-for="mealItem in this.listData" :key="mealItem.id">
        <button class="btn btn-outline-success m-2 w-75" @click="function2(listData,mealItem.id)">{{ mealItem.name }}</button>
      </li>
    </ul>
    <button class="btn btn-outline-secondary mt-4" @click="this.function">🗑 Delete list</button>
  </div>
</template>


<script>
export default {
  name: "Meallist",
  props: {
    mealList: {
      type: Array
    },
    function: {
        type: Function
    },
    function2: {
        type: Function
    }
  },
  data() {
    return {
      listData: this.mealList
    }
  },
};
</script>