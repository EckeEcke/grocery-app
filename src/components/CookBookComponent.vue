<template>
  <div>
    <div class="mb-5">
      <div class="bg-warning">
        <div class="container py-4">
          <div>
            <div class="row">

                <div class="col-12 py-0 rounded">
                  <div class="row">
                    <div class="col-12">
                      <input
                        class="form-control"
                        type="text"
                        v-model="newMeal"
                        placeholder="Add new meal"
                        maxlength="30"
                      />
                    </div>
                    <transition name="fade">
                      <div v-if="newMeal.length > 0" class="input-group my-3">
                        <input
                          class="form-control"
                          type="text"
                          v-model="newIngredient"
                          placeholder="Add ingredient (optional)"
                          maxlength="30"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-primary col-12"
                            @click="pushIngredient"
                          >
                            <font-awesome-icon
                              :icon="['fas', 'plus']"
                              class="search-icon"
                            />
                          </button>
                        </div>
                      </div>
                    </transition>
                  </div>

                  <transition name="fade">
                    <div
                      v-if="
                        this.ingredients.length > 0 && this.newMeal.length > 0
                      "
                    >
                      <h5 style="text-align: left" class="mt-3 text-white">
                        Ingredients:
                      </h5>
                      <ul style="text-align: left">
                        <button
                          class="btn btn-secondary mx-1 mb-1"
                          v-for="ingredient in ingredients"
                          :key="ingredient"
                          @click="deleteIngredient(ingredient)"
                        >
                          {{ ingredient }} X
                        </button>
                      </ul>
                    </div>
                  </transition>
                  <button
                    v-if="newMeal.length > 0"
                    class="btn col-12 btn-primary search-btn"
                    @click="formSubmit"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'plus']"
                      class="search-icon"
                    />
                    Add meal
                  </button>
                </div>

            </div>
          </div>
        </div>
      </div>
      <div v-if="this.plannedItems.length == 0">
        <img
          class="illustration mt-5 mb-3"
          src="../assets/meal-illustration.svg"
        />
        <p class="mb-3">Add new meals or choose from your cookbook</p>
      </div>

      <div class="row">
        <p v-if="this.plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in"
            ><span :key="plannedItems.length">{{
              plannedItems.length
            }}</span></transition
          >
          meal(s) planned
        </p>
      </div>
      <div v-if="this.plannedItems.length >= 1" class="pb-5">
        <transition-group name="slide-fade">
          <div
            class="row px-3 hover-zoom"
            v-for="meal in this.plannedItems"
            :key="meal.id"
          >
            <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden">
              <button
                v-if="meal"
                class="btn btn-outline-secondary w-100 mx-0"
                style="text-align: left"
                :key="meal.id"
                @click="checkItem(meal.name)"
              >
                {{ meal.name }}
              </button>
            </div>
            <div class="col-1 px-0">
              <button
                class="
                  btn btn-outline-secondary
                  delete-item-btn
                  px-0
                  mx-0
                  w-100
                "
                @click="$emit('show-details', meal)"
              >
                <font-awesome-icon
                  :icon="['fas', 'search']"
                  class="trash-icon-item"
                />
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
            <hr />
          </div>
        </transition-group>
      </div>

      <div class="my-4">
        <div class="bg-warning pt-1 pb-4 px-4">
          <h3 class="text-white">Cook Book</h3>
          <input
            v-model="search"
            type="search"
            ref="search"
            class="form-control"
            placeholder="Search dish"
          />
        </div>
      </div>
      <transition name="slide-fade">
        <div class="container">
          <transition-group name="slide-fade">
            <div
              class="row px-3 hover-zoom"
              v-for="meal in this.filteredItems"
              :key="meal.id"
            >
              <div class="col-10 text-nowrap overflow-hidden px-0 mx-0">
                <button
                  class="btn w-100 mx-0"
                  style="text-align: left"
                  :class="
                    meal.planned ? 'btn-success' : 'btn-outline-secondary'
                  "
                  :key="meal.id"
                  @click="push(meal.name)"
                >
                  {{ meal.name }}
                </button>
              </div>
              <div class="col-1 p-0">
                <button
                  class="
                    btn btn-outline-secondary
                    delete-item-btn
                    px-0
                    mx-0
                    w-100
                  "
                  @click="$emit('show-details', meal)"
                >
                  <font-awesome-icon
                    :icon="['fas', 'search']"
                    class="trash-icon-item"
                  />
                </button>
              </div>
              <div class="col-1 px-0 mx-0">
                <button
                  class="
                    btn
                    w-100
                    btn-outline-secondary
                    align-bottom
                    delete-item-btn
                  "
                  @click="deleteItem({ array: listData, element: meal.name })"
                >
                  <font-awesome-icon
                    :icon="['fas', 'trash-alt']"
                    class="trash-icon-item"
                  />
                </button>
              </div>
              <hr />
            </div>
          </transition-group>
        </div>
      </transition>
    </div>
    <img class="illustration mb-5" src="../assets/cooking-illustration.svg" />
    <br />
    <button v-if="cookBook.length >= 1" class="btn btn-secondary mx-2 mb-1" @click="deleteCookbook">
      <font-awesome-icon :icon="['fas', 'trash-alt']" />Delete all
    </button>
    <transition name="fade">
      <Toast v-if="showToast" :message="message" />
    </transition>
  </div>
</template>

<script>
import Toast from "./ToastComponent.vue";
export default {
  name: "CookBook",
  components: {
    Toast
  },
  props: {
    cookBook: {
      type: Array,
    },
    push: {
      type: Function,
    },
    checkItem: {
      type: Function,
    },
    deleteItem: {
      type: Function,
    },
  },
  data() {
    return {
      listData: this.cookBook,
      search: "",
      newMeal: "",
      newIngredient: "",
      ingredients: [],
      showToast: false,
      message: ''
    };
  },
  computed: {
    sortedItems: function () {
      let sortedArray = this.listData;
      return sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    },
    filteredItems: function () {
      return this.sortedItems.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    plannedItems: function () {
      return this.cookBook.filter((item) => item.planned == true);
    },
  },
  watch: {
    cookBook() {
      this.listData = this.cookBook;
    },
  },
  methods: {
    formSubmit(event) {
      event.preventDefault();
      if (this.newMeal.length > 0) {
        this.$emit("submit", this.newMeal, this.ingredients);
        this.newMeal = "";
        this.ingredients = [];
      }
    },
    focusInput() {
      setTimeout(() => {
        this.$refs.search.focus();
      }, 10);
    },
    deleteCookbook: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        // this.cookBook = [];
        localStorage.removeItem("cookbook");
        this.createToast()
        this.$emit('cb-deleted');
      }
    },
    pushIngredient(event) {
      event.preventDefault();
      this.ingredients.push(this.newIngredient);
      this.newIngredient = "";
    },
    deleteIngredient(ingredient) {
      let index = this.ingredients.indexOf(ingredient);
      this.ingredients.splice(index, 1);
    },
    createToast: function () {
      this.message = "Cookbook was deleted"
      this.showToast = true
      setTimeout(() => this.showToast = false, 1500)
    }
  },
};
</script>

<style scoped>
.hover-zoom {
  transition: all 0.3s;
}
.hover-zoom:hover {
  transform: translate(0.5%, -1%);
}
</style>