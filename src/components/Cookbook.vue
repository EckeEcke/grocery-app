<template>
  <div class="col-sm-12 col-md-10 col-lg-5 bg-white py-4 px-2 rounded mb-5 mx-auto" style="max-width: 95vw">
  
    <div class="container mt-3 mb-5">
      <h3 class="mb-3">Meal Plan</h3>
      <p v-if="this.plannedItems.length == 0">Add new meals or choose from your cookbook</p>
      <form action="post" class="d-grid gap-2 row mb-5">
            <input class="form-control mb-2" type="text" v-model="newMeal" placeholder="Add new meal" maxlength="30" />
            <button class="btn btn-primary mb-2" @click="formSubmit">Add</button>
        </form>
      <transition-group name="slide-fade">
        <div class="row justify-content-center" v-for="meal in this.plannedItems" :key="meal.id">
          
          <div class="col-11 col-md-11 px-0 mx-0 text-nowrap overflow-hidden">
          <button
              v-if="meal"
              class="btn w-100 px-0 mx-0"
              :key="meal.id"
              @click="checkItem(meal.name)"
            >
              {{ meal.name }}
            </button>
        </div>
        <div class="col-1 px-0 mx-0">
          <button
            class="btn btn-outline-secondary align-bottom delete-item-btn"
            @click="checkItem(meal.name)"
          >
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="trash-icon-item"
            />
          </button>
        </div>
         <hr>
        </div>
      </transition-group>

      <div class="row mt-5 mb-3">
        <h3 style="position: relative" @click="hideItemlist = !hideItemlist">Cook Book<span><font-awesome-icon :icon="['fas', 'chevron-up']" class="accordion-icon" :class="{'flipped': hideItemlist }" /></span></h3>
      </div>
    <transition name="slide-fade">
      <div v-if="!hideItemlist">
      <div class="row no-gutters mb-4">
        <div class="col-11 px-0">
<input v-model="search" type="search" ref="search" class="form-control" placeholder="Search dish" />
        </div>
        <div class="col-1 px-0 mx-0">
<button class="btn btn-primary search-btn" @click="focusInput">
            <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
          </button>
        </div>
          
      </div>

<transition-group name="slide-fade">
          <div class="row justify-content-center" v-for="meal in this.filteredItems" :key="meal.id">
      <div class="col-11 text-nowrap overflow-hidden  px-0 mx-0">
        <button class="btn w-100 px-0 mx-0" :class="meal.planned ? 'btn-success' : 'btn-outline-secondary'" :key="meal.id" @click="push(meal.name)" >
          {{ meal.name }}
        </button>
      </div>
      <div class="col-1 px-0 mx-0">
        <button class="btn btn-outline-secondary align-bottom delete-item-btn" @click="deleteItem(listData,meal.name)"><font-awesome-icon :icon="['fas','trash-alt']" class="trash-icon-item" /></button>
        </div>
        <hr>
          </div>
      </transition-group>
      </div>

    </transition>
      
    </div>
    <img class="illustration mb-5" src="../assets/supplylist-illustration.svg">
      <br>
    <button class="btn btn-secondary mx-2 mb-1" @click="function2">
      <font-awesome-icon :icon="['fas','trash-alt']" />Delete all
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
    push: {
      type: Function,
    },
    checkItem: {
      type: Function
    }
  },
  data() {
    return {
      listData: this.cookBook,
      search: '',
      hideItemlist: false,
      newMeal: ''
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
    },
      plannedItems: function(){
        return this.cookBook.filter(item => item.planned == true);
      }
  },
  methods: {
    formSubmit(event){
        event.preventDefault();
            if (this.newMeal.length > 0) {
                this.$emit('submit', this.newMeal)
                this.newMeal = ''
            }
    },
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
.btn-outline-secondary,
.btn-success {
  border-radius: 0;
}

@media (max-width: 500px) {
  button {
    font-size: 0.9em;
  }
}
</style>