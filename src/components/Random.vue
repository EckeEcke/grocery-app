<template>
  <div class="no-br-mobile border-0 mx-auto my-5 container">
    <div class="card bg-white border-0">
      <div class="card-header bg-warning rounded py-1 px-4 mb-4">
        <h3 class="text-white m-2 p-2">Random recipe</h3>
      </div>
      <div v-if="isLoading" class="card-body p-4">
        <div class="spinner-3 mx-auto my-5"></div>
      </div>
      <div v-if="requestFailed" class="card-body p-4">
        <p>Unfortunately your request failed. Please check your internet connection or try again later.</p>
      </div>
      <div v-if="!isLoading && !requestFailed" class="card-body pb-5">
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
        <div class="card-footer no-br-mobile border-0 bg-white" style="text-align: right">
          <button v-if="!requestFailed" class="btn btn-warning my-2" @click="addRecipe">
            Add to cookbook
          </button>
          <button class="btn btn-outline-secondary" @click="loadRecipe">
            Load new recipe
          </button>
        </div>
    </div>
    <transition name="fade">
      <Toast v-if="showToast" :message="message" />
    </transition>
  </div>
</template>

<script>

import axios from "axios";
import Toast from "./Toast.vue";
export default {
  name: "Random",
  components: {
    Toast
  },
  data() {
    return {
      showInstructions: false,
      showIngredients: false,
      randomMeal: null,
      isLoading: true,
      message: '',
      showToast: false,
      requestFailed: false,
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
      this.requestFailed = false
      const controller = new AbortController();
      axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php", {
          signal: controller.signal
        })
        .catch(error=>{
          console.log(error)
          this.isLoading = false
          this.requestFailed = true
        })
        .then((response) => this.randomMeal = response)
        .then(this.isLoading = false)
        setTimeout(()=>{
          controller.abort()
        } ,3000)
    },
    addRecipe: function () {
      this.$emit('submit', this.randomMeal.data.meals[0].strMeal, this.ingredients)
      this.createToast()
    },
    createToast: function () {
      this.message = `${this.randomMeal.data.meals[0].strMeal} added to your cookbook`
      this.showToast = true
      setTimeout(() => this.showToast = false, 1500)
    }
  },
};
</script>

<style scoped>
  .card-footer:last-child {
    margin-left: 1rem;
  }
</style>