<template>
  <div
    class="col-12 col-md-6 col-lg-5 px-0 rounded border-0 mx-auto mb-5"
  >
    <div class="card bg-white border-0">
      <div class="card-header bg-dark">
        <h3 class="text-warning m-2 p-2">Random recipe</h3>
      </div>

      <div class="card-body">
        <div class="row">
          <div class="col-4 rounded">
            <img class="dish-image" :src="randomMeal.data.meals[0].strMealThumb" />
          </div>
          
        <div class="col-8" style="text-align: left">
          <h4>
          {{ randomMeal.data.meals[0].strMeal }}
        </h4>
          <span class="recipe-description">
          Category: {{ randomMeal.data.meals[0].strCategory }}
        </span>
        <br>
        <span class="recipe-description">
          Area: {{ randomMeal.data.meals[0].strArea }}
        </span>
        <br>
        <span class="recipe-description">
          <a
            class="link-info"
            :href="randomMeal.data.meals[0].strSource"
            target="_blank"
            >Link to recipe</a
          >
        </span>
        </div>
        
        </div>
        
        <div class="row mt-5 mb-3">
          <div class="col-1 mb-2 bg-light"></div>
          <h3
            class="col-10 bg-light"
            @click="() => (showInstructions = !showInstructions)"
          >
            Instructions
          </h3>
          <h3
            class="col-1 px-0 bg-light"
            @click="showInstructions = !showInstructions"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              class="accordion-icon"
              :class="{ flipped: !showInstructions }"
            />
          </h3>
        </div>
        <transition name="slide-fade">
          <p v-if="showInstructions" class="dish-text px-4">
            {{ randomMeal.data.meals[0].strInstructions }}
          </p>
        </transition>
        <div class="row mb-3">
          <div class="col-1 mb-2 bg-light"></div>
          <h3
            class="col-10 bg-light"
            @click="() => (showIngredients = !showIngredients)"
          >
            Ingredients
          </h3>
          <h3
            class="col-1 px-0 bg-light"
            @click="showIngredients = !showIngredients"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              class="accordion-icon"
              :class="{ flipped: !showIngredients }"
            />
          </h3>
        </div>
        <transition name="slide-fade">
          <div v-if="showIngredients">
            <p
              v-for="(ingredient, index) in ingredients"
              :key="ingredient + index"
            >
              {{ ingredient }} <span v-if="ingredient.length >= 1 && measures[index].length >= 1">|</span>
              {{ measures[index] }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Random",
  props: {
    randomMeal: {
      type: Object,
    },
  },
  data() {
    return {
      showInstructions: false,
      showIngredients: false,
    };
  },
  computed: {
    measures() {
      let list = [];
      for (let i = 1; i <= 20; i++) {
        if (eval(`this.randomMeal.data.meals[0].strMeasure${i}`) !== "") {
          list.push(eval(`this.randomMeal.data.meals[0].strMeasure${i}`));
        }
      }
      return list;
    },
    ingredients() {
      let list = [];
      for (let i = 1; i <= 20; i++) {
        if (eval(`this.randomMeal.data.meals[0].strIngredient${i}`) !== "") {
          list.push(eval(`this.randomMeal.data.meals[0].strIngredient${i}`));
        }
      }
      return list;
    },
  },
};
</script>