<template>
    <div>
        <div class="backdrop" @click="$emit('hide')"></div>
    <div class="modal-detailpage card border-0">
        <h4 class="card-header bg-dark border-0 text-warning">{{ meal.name }}</h4>
        <div class="card-body" style="text-align: left">
             <button class="btn btn-secondary mx-1 mb-1" v-for="ingredient in meal.ingredients" :key="ingredient">
                {{ ingredient }}
            </button>
        </div>
       
    </div>
    </div>
</template>

<script>
export default {
  name: "Detailpage",
  props: {
      meal: {
          type: Array
      }
  }
};
</script>