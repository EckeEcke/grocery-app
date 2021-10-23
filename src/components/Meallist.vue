<template>
  <div class="col-sm-12 col-md-10 col-lg-5 px-2 py-4 bg-white mb-5 rounded" style="max-width: 95vw;">
    <h3>Meal Plan</h3>
    <div class="container my-5">
      <div v-if="this.plannedMeals.length == 0">Add new dishes or choose from your <a class="link" @click="this.function3">cookbook</a></div>
      <transition-group name="slide-fade">
<div class="row justify-content-center" v-for="mealItem in this.plannedMeals" :key="mealItem.name" :planned="mealItem.planned">
      <div class="col-11 px-0 mx-0 text-nowrap overflow-hidden">
        
            
            <button
              v-if="mealItem"
              class="btn w-100 px-0 mx-0"
              :key="mealItem.name"
              @click="function2(mealItem.name)"
            >
              {{ mealItem.name }}
            </button>
        </div>
        <div class="col-1 px-0 mx-0">
          <button
            class="btn btn-outline-secondary align-bottom delete-item-btn"
            @click="deleteItem(listData, mealItem.name)"
          >
            <font-awesome-icon
              :icon="['fas', 'trash-alt']"
              class="trash-icon-item"
            />
          </button>
        </div>
        <hr>
  </div>
      </transition-group>
      
    </div>
    <img class="illustration mb-5 mt-3" src="../assets/meal-illustration.svg">
      <br>

      <button class="btn btn-primary mx-1" @click="this.function3"><font-awesome-icon :icon="['fas','utensils']" />Cook Book</button>
  </div>
</template>


<script>
export default {
  name: "Meallist",
  props: {
    cookBook: {
      type: Array,
    },
    function2: {
      type: Function,
    },
    function3: {
      type: Function,
    },
    deleteItem: {
      type: Function
    }
  },
 data() {
   return {
     listData: this.cookBook
    };
  },
  computed: {
    plannedMeals: function(){
      return this.cookBook.filter(meal => meal.planned == true);
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