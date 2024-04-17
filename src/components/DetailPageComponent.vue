<template>
    <div>
        <div class="backdrop" @click="$emit('hide')"></div>
    <div class="modal-detailpage card border-0">
        <h4 class="card-header bg-warning border-0 text-white">{{ meal.name }}</h4>
        <div class="card-body" style="text-align: left">
             <button class="btn mx-1 mb-1" :class="isItemPlanned(ingredient) ? 'btn-success' : 'btn-secondary'" v-for="ingredient in meal.ingredients" :key="ingredient" @click="checkIngredients(ingredient)">
                {{ ingredient }}
            </button>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-secondary mx-3" @click="deleteItem()">Delete</button>
            <button class="btn btn-primary" @click="$emit('hide')">Close</button>
        </div>
       
    </div>
    </div>
</template>

<script>
export default {
  name: "DetailPage",
  props: {
      meal: {
          type: Object
      },
  },
  computed: {
      groceryList: function () {
        return this.$store.getters.getGroceryList
      },
      plannedItems: function () {
        return this.$store.getters.getPlannedItems
    },
  },
  methods: {
      isItemPlanned: function(ingredient) {
        let index = this.groceryList.findIndex(
            (item) => item.name === ingredient
        )
            if (index >= 0) {
                return this.groceryList[index].planned
            } else return false
        },
        checkIngredients(ingredient) {
            if (this.isItemPlanned(ingredient)) {
                this.$store.commit("setItemPlanned", ingredient)
            } else this.$store.commit("addNewItem", ingredient)
        },
        deleteItem() {
            this.$store.commit("deleteSingleMeal", this.meal)
            this.$emit('hide')
        }
  }
};
</script>