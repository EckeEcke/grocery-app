<template>
  <div id="app" class="pt-5">
    <Navbar v-if="menuShown" />
    <button id="toggle-nav-BTN" class="btn" style="font-size: 2.5em" @click="showMenu">🍔</button>

    <h1 class="p-5 text-white pt-5">Meal Planner</h1>
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
      mealList: [],
      groceryList: [],
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
      this.newMeal = "";
      console.log(this.mealList);
    },
    pushNewGroceryItem: function () {
      this.groceryList.push({ name: this.newGroceryItem, id: this.globalID });
      this.globalID += 1;
      localStorage.setItem("globalID", this.globalID);
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
      }
    },
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.groceryList = [];
      }
    },
    deleteSingleItem: function (array, element) {
      const index = array
        .map(function (element) {
          return element.id;
        })
        .indexOf(element);
      array.splice(index, 1);
    },
  },
};
</script>

<style>
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
  position: fixed;
  right: 10px;
  top: 10px;
}

li {
  list-style-type: none;
}

ul {
  /*margin: 0;*/
  padding: 0;
}
</style>
