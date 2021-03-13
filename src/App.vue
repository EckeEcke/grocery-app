<template>
  <div id="app">
    <Navbar v-if="menuShown" />
    <button
      id="toggle-nav-BTN"
      class="btn"
      style="font-size: 2.5em"
      @click="showMenu"
    >
      🍔
    </button>

    <h1 class="p-5 text-white mb-5">Meal Planner</h1>
    <form
      action="post"
      class="d-grid gap-2"
      style="width: 500px; max-width: 90vw; margin: 0 auto"
    >
      <input
        class="form-control mb-2"
        type="text"
        v-model="newMeal"
        placeholder="Add new meal"
        maxlength="30"
      />
      <input
        class="form-control mb-2"
        type="text"
        v-model="newGroceryItem"
        placeholder="Add new grocery item"
        maxlength="30"
      />
      <button class="btn btn-primary mb-2" @click="formSubmit">Add</button>
    </form>

    <br />
    <br />

    <div
      class="bg-white px-3 py-4 mx-auto rounded mb-5"
      style="width: 500px; max-width: 90vw"
      v-if="groceryList.length == 0 && mealList.length == 0"
    >
      <p>👩‍🍳 Plan your meals <span style="color: green">✔</span></p>
      <p>📝 Create a grocery list <span style="color: green">✔</span></p>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <Meallist
          v-if="mealList.length > 0"
          :mealList="mealList"
          :function="deleteMeallist"
          :function2="deleteSingleItem"
        />
        <div
          v-if="mealList.length > 0 && groceryList.length > 0"
          class="col-lg-1"
        ></div>
        <GroceryList
          v-if="groceryList.length > 0"
          :groceryList="groceryList"
          :function="deleteGrocerylist"
          :function2="deleteSingleItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navigation.vue";
import GroceryList from "./components/Grocerylist.vue";
import Meallist from "./components/Meallist.vue";

export default {
  name: "App",
  components: {
    Navbar,
    GroceryList,
    Meallist,
  },
  data: function () {
    return {
      mealList: JSON.parse(localStorage.getItem("meallist")) || [],
      groceryList: JSON.parse(localStorage.getItem("grocerylist")) || [],
      menuShown: false,
      newMeal: "",
      newGroceryItem: "",
      globalID: parseInt(localStorage.getItem("globalID")) || 0,
    };
  },

  methods: {
    showMenu: function () {
      this.menuShown = !this.menuShown;
    },
    pushNewMeal: function () {
      this.mealList.push({ name: this.newMeal, id: this.globalID });
      this.globalID += 1;
      localStorage.setItem("globalID", this.globalID);
      localStorage.setItem("meallist", JSON.stringify(this.mealList));
      this.newMeal = "";
      console.log(this.mealList);
    },
    pushNewGroceryItem: function () {
      this.groceryList.push({ name: this.newGroceryItem, id: this.globalID });
      this.globalID += 1;
      localStorage.setItem("globalID", this.globalID);
      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
      this.newGroceryItem = "";
      console.log(this.groceryList);
      console.log(this.globalID);
    },
    formSubmit: function (event) {
      event.preventDefault();
      if (this.newGroceryItem.length > 0) {
        this.pushNewGroceryItem();
      }
      if (this.newMeal.length > 0) {
        this.pushNewMeal();
      }
    },
    deleteMeallist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.mealList = [];
        localStorage.removeItem("meallist");
      }
    },
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.groceryList = [];
        localStorage.removeItem("grocerylist");
      }
    },
    deleteSingleItem: function (array, element) {
      const index = array
        .map(function (element) {
          return element.id;
        })
        .indexOf(element);
      array.splice(index, 1);
      localStorage.setItem("meallist", JSON.stringify(this.mealList));
      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
    },
  },
};
</script>

<style>
@font-face {
  font-family: "niceFont";
  src: url("./assets/niceFont.ttf");
}

h1 {
  font-family: niceFont;

  background-image: linear-gradient(
      to bottom,
      rgba(23, 23, 24, 0.52),
      rgba(31, 21, 28, 0.73)
    ),
    url("./assets/food-header.jpg");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to right, #ff8008, #ffc837);
}

#toggle-nav-BTN {
  position: absolute;
  right: 2px;
  top: 2px;
}

li {
  list-style-type: none;
}

ul {
  /*margin: 0;*/
  padding: 0;
}

p {
  font-size: 1.5em;
}
</style>
