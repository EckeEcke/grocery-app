<template>
  <div
    class="col-sm-12 col-md-10 col-lg-5 bg-white py-4 px-2 rounded mb-5"
    style="max-width: 95vw"
  >
    <h3>Cook Book</h3>
    <p class="mt-4">Click a dish to add it to your <a class="link" @click="this.function">meal list</a></p>
    <div class="container mt-3 mb-5">
      <div class="row no-gutters mb-4">
        <div class="col-11 col-md-11 px-0">
<input v-model="search" type="search" ref="search" class="form-control" placeholder="Search dish" />
        </div>
          
        
          <div class="col-1 px-0 mx-0">
<button class="btn btn-primary search-btn" @click="focusInput">
            <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
          </button>
        </div>
      </div>
        
      <transition-group name="slide-fade">
      <div
        class="row no-gutters my-1 justify-content-center"
        v-for="dish in this.filteredItems"
        :key="dish.name"
      >
      
        <div class="col-11 text-nowrap overflow-hidden px-0 mx-0">
            
            <button
              v-if="dish"
              class="btn w-100 px-0 mx-0"
              :class="dish.planned ? 'btn-success' : 'btn-outline-secondary'"
              :key="dish.name"
              @click="pushMealFromCookbook(dish.name)"
            >
              {{ dish.name }}
            </button>
        </div>
        <div class="col-1 px-0 mx-0">
          <button
            class="btn btn-outline-secondary align-bottom delete-item-btn"
            @click="function3(listData, dish.name)"
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

    <img class="illustration mb-5" src="../assets/cooking-illustration.svg" />
    <br />
    <button class="btn btn-primary mb-1" @click="this.function">
      <font-awesome-icon :icon="['fas', 'arrow-circle-left']" />Meal Plan
    </button>
    <button class="btn btn-secondary mx-2 mb-1" @click="this.function2">
      <font-awesome-icon :icon="['fas', 'trash-alt']" />Delete all
    </button>
  </div>
</template>

<script>
export default {
  name: "Cookbook",
  props: {
    cookBook: {
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
    pushMealFromCookbook: {
      type: Function,
    },
  },
  data() {
    return {
      listData: this.cookBook,
      search: ''
    };
  },
  computed: {
    sortedItems: function () {
      let sortedArray = this.listData;
      return sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    },
    filteredItems: function() {
      return this.sortedItems.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    focusInput(){
        setTimeout(() => {
               this.$refs.search.focus();
            }, 10);
    }
  }
};
</script>

<style scoped>
p {
  font-size: 1em;
}
.delete-item-btn:hover {
  background-color: grey;
}
.trash-icon-item {
  color: grey;
  margin: 0;
}
button:hover .trash-icon-item {
  color: white;
}
.btn-outline-secondary,
.btn-success {
  border-radius: 0;
}
.delete-item-btn {
  padding: 6px 12px;
}

@media (max-width: 500px) {
  button {
    font-size: 0.9em;
  }
}
</style>