<template>
  <div>
    <div class="container mt-3 mb-5">
      <div class="row mb-3">
        <div class="col-1 mb-2 bg-light"></div>
        <h3 class="col-10 bg-light">Meal Plan</h3>
        <div class="col-1 mb-2 bg-light"></div>
      </div>
      <form action="post" class="row">
        <div class="col-11 px-0">
          <input
            class="form-control"
            type="text"
            v-model="newMeal"
            placeholder="Add new meal"
            maxlength="30"
          />
        </div>
        <div class="col-1 px-0 mx-0">
          <button class="btn btn-primary search-btn" @click="formSubmit">
            <font-awesome-icon :icon="['fas', 'plus']" class="search-icon" />
          </button>
        </div>
      </form>
      <img
        v-if="this.plannedItems.length == 0"
        class="illustration mt-5 mb-3"
        src="../assets/meal-illustration.svg"
      />
      <p v-if="this.plannedItems.length == 0" class="mb-3">
        Add new meals or choose from your cookbook
      </p>
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

      <transition-group name="slide-fade">
        <div
          class="row justify-content-center"
          v-for="meal in this.plannedItems"
          :key="meal.id"
        >
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
          <hr />
        </div>
      </transition-group>

      <div class="row mt-5 mb-3">
        <div class="col-1 mb-2 bg-light"></div>
        <h3 class="col-10 bg-light" @click="hideItemlist = !hideItemlist">Cook Book</h3>
        <h3 class="col-1 px-0 bg-light" @click="hideItemlist = !hideItemlist">
          <font-awesome-icon
            :icon="['fas', 'chevron-up']"
            class="accordion-icon"
            :class="{ flipped: hideItemlist }"
          />
        </h3>
      </div>
      <transition name="slide-fade">
        <div v-if="!hideItemlist">
          <div class="row no-gutters mb-4">
            <div class="col-11 px-0">
              <input
                v-model="search"
                type="search"
                ref="search"
                class="form-control"
                placeholder="Search dish"
              />
            </div>
            <div class="col-1 px-0 mx-0">
              <button class="btn btn-primary search-btn" @click="focusInput">
                <font-awesome-icon
                  :icon="['fas', 'search']"
                  class="search-icon"
                />
              </button>
            </div>
          </div>
          <transition-group name="slide-fade">
            <div
              class="row justify-content-center"
              v-for="meal in this.filteredItems"
              :key="meal.id"
            >
              <div class="col-11 text-nowrap overflow-hidden px-0 mx-0">
                <button
                  class="btn w-100 px-0 mx-0"
                  :class="
                    meal.planned ? 'btn-success' : 'btn-outline-secondary'
                  "
                  :key="meal.id"
                  @click="push(meal.name)"
                >
                  {{ meal.name }}
                </button>
              </div>
              <div class="col-1 px-0 mx-0">
                <button
                  class="btn btn-outline-secondary align-bottom delete-item-btn"
                  @click="deleteItem(listData, meal.name)"
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
    <button class="btn btn-secondary mx-2 mb-1" @click="function2">
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
      hideItemlist: false,
      newMeal: "",
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
  methods: {
    formSubmit(event) {
      event.preventDefault();
      if (this.newMeal.length > 0) {
        this.$emit("submit", this.newMeal);
        this.newMeal = "";
      }
    },
    focusInput() {
      setTimeout(() => {
        this.$refs.search.focus();
      }, 10);
    },
  },
};
</script>