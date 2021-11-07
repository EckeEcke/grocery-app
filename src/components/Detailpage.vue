<template>
    <div>
        <div class="backdrop" @click="$emit('hide')"></div>
    <div class="modal-detailpage card border-0">
        <h4 class="card-header bg-dark border-0 text-warning">{{ meal.name }}</h4>
        <div class="card-body" style="text-align: left">
             <button class="btn mx-1 mb-1" :class="isItemPlanned(ingredient) ? 'btn-success' : 'btn-secondary'" v-for="ingredient in meal.ingredients" :key="ingredient" @click="checkIngredients(ingredient)">
                {{ ingredient }}
            </button>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-secondary mx-3" @click="deleteItem({array: listData, element: meal.name})">Delete</button>
            <button class="btn btn-warning" @click="$emit('hide')">Close</button>
        </div>
       
    </div>
    </div>
</template>

<script>
export default {
  name: "Detailpage",
  props: {
      meal: {
          type: Object
      },
      groceryList: {
      type: Array,
    },
    cookBook: {
        type: Array
    }
  },
  data() {
      return {
          listData: this.cookBook
      }
  },
  computed: {
      plannedItems: function () {
        return this.groceryList.filter((item) => item.planned == true);
    },
  },
  methods: {
      isItemPlanned: function(ingredient) {
        let index = this.groceryList.findIndex(
            (item) => item.name === ingredient
        );
            if (index >= 0) {
                return this.groceryList[index].planned
            } else return false
        },
        checkIngredients(ingredient) {
            console.log(this.isItemPlanned(ingredient))
            if (this.isItemPlanned(ingredient)) {
                this.$emit('toggle', ingredient)
            } else this.$emit('submit', ingredient)
        },
        deleteItem(payload) {
            this.$emit('delete', payload)
            this.$emit('hide')
        }
  }
};
</script>