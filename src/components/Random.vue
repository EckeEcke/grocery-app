<template>
  <div class="col-12 col-md-10 col-lg-5 px-0 rounded border-0 mx-auto mb-5">
    <div class="card bg-white border-0">
      <div class="card-header bg-dark">
        <h3 class="text-warning m-2 p-2">Random recipe</h3>
      </div>
      <div v-if="isLoading" class="card-body p-4">
        <div class="spinner-3 mx-auto my-5"></div>
      </div>
      <div v-if="!isLoading" class="card-body pb-5">
        <div class="row bg-light p-1">
          <div class="col-4 rounded">
            <img
              class="dish-image"
              :src="randomMeal.data.meals[0].strMealThumb"
            />
          </div>

          <div class="col-8" style="text-align: left">
            <h4>
              {{ randomMeal.data.meals[0].strMeal }}
            </h4>
            <span class="recipe-description">
              Category: {{ randomMeal.data.meals[0].strCategory }}
            </span>
            <br />
            <span class="recipe-description">
              Area: {{ randomMeal.data.meals[0].strArea }}
            </span>
            <br />
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

        <div class="row mt-5">
          <div class="col-1 mb-2"></div>
          <h5
            class="col-10"
            @click="() => (showInstructions = !showInstructions)"
          >
            Instructions
          </h5>
          <h5 class="col-1 px-0" @click="showInstructions = !showInstructions">
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              class="accordion-icon"
              :class="{ flipped: !showInstructions }"
            />
          </h5>
        </div>
        <transition name="slide-fade">
          <p v-if="showInstructions" class="dish-text px-4">
            {{ randomMeal.data.meals[0].strInstructions }}
          </p>
        </transition>
        <hr class="mb-2" />
        <div class="row">
          <div class="col-1 mb-2"></div>
          <h5
            class="col-10"
            @click="() => (showIngredients = !showIngredients)"
          >
            Ingredients
          </h5>
          <h5 class="col-1 px-0" @click="showIngredients = !showIngredients">
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              class="accordion-icon"
              :class="{ flipped: !showIngredients }"
            />
          </h5>
        </div>
        <transition name="slide-fade">
          <div v-if="showIngredients">
            <br />
            <p
              v-for="(ingredient, index) in ingredients"
              :key="ingredient + index"
            >
              {{ ingredient }}
              <span v-if="ingredient.length >= 1 && measures[index].length >= 1"
                >|</span
              >
              {{ measures[index] }}
            </p>
          </div>
        </transition>
        <hr />

      </div>
              <div class="card-footer" style="text-align: right">
                <button class="btn btn-warning mx-2" @click="addRecipe">
            Add to cookbook
          </button>
          <button class="btn btn-warning" @click="loadRecipe">
            Load new recipe
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Random",
  data() {
    return {
      showInstructions: false,
      showIngredients: false,
      randomMeal: null,
      isLoading: true,
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
  mounted() {
    this.loadRecipe();
  },
  methods: {
    loadRecipe: function () {
      this.isLoading = true;
      axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => (this.randomMeal = response))
        .then((this.isLoading = false));
    },
    addRecipe: function () {
      this.$emit('submit', this.randomMeal.data.meals[0].strMeal, this.ingredients)
    }
  },
};
</script>