<template>
  <div id="app">
    <transition name="fade">
      <Navbar 
        v-if="menuShown"
        :menuShown="menuShown"
        :toggleFunction="showMenu"
      />
    </transition>

    <button
      v-if="!menuShown"
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
        placeholder="Add new dish"
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
      v-if="groceryList.length == 0 && cookBook.length == 0 && !cookbookShown"
    >
      <p>👩‍🍳 Plan your meals <span style="color: green">✔</span></p>
      <p>📝 Create a grocery list <span style="color: green">✔</span></p>
      <button
        class="btn btn-primary my-3"
        v-if="this.cookBook.length > 0"
        @click="showCookbook"
      >
        Open Cook Book
      </button>
      <button
        class="btn btn-primary my-3"
        v-if="this.cookBook.length > 0"
        @click="showItemlist"
      >
        Open Item List
      </button>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <Meallist
          v-if="cookBook.length > 0 && !cookbookShown && !itemlistShown"
          :cookBook="cookBook"
          :function="deleteMeallist"
          :function2="checkSingleMeal"
          :function3="showCookbook"
        />
        <div
          v-if="cookBook.length > 0 && groceryList.length > 0 && !cookbookShown && !itemlistShown"
          class="col-lg-1"
        ></div>
        <GroceryList
          v-if="groceryList.length > 0 && !itemlistShown && !cookbookShown"
          :groceryList="groceryList"
          :function2="checkSingleItem"
          :function3="showItemlist"
        />
        <Cookbook
          v-if="cookbookShown && !itemlistShown"
          :cookBook="cookBook"
          :function="showCookbook"
          :someFunction="pushNewMealfromCookbook"
          :function2="deleteCookbook"
          :function3="deleteSingleItem"
      
        />
        <Supplylist 
          v-if="itemlistShown && !cookbookShown"
          :groceryList="groceryList"
          :function="showItemlist"
          :someFunction="pushNewItemfromList"
          :function2="deleteGrocerylist"
          :function3="deleteSingleItem"
        
        />
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from "./components/Navigation.vue";
import GroceryList from "./components/Grocerylist.vue";
import Meallist from "./components/Meallist.vue";
import Cookbook from "./components/Cookbook.vue";
import Supplylist from "./components/Supplylist.vue";


export default {
  name: "App",
  components: {
    Navbar,
    GroceryList,
    Meallist,
    Cookbook,
    Supplylist,
  },
  data: function () {
    return {
      groceryList: JSON.parse(localStorage.getItem("grocerylist")) || [],
      menuShown: false,
      cookbookShown: false,
      itemlistShown: false,
      newMeal: "",
      newGroceryItem: "",
      globalID: parseInt(localStorage.getItem("globalID")) || 0,
      cookBook: JSON.parse(localStorage.getItem("cookbook")) || [],
    };
  },

  methods: {

    showMenu: function () {
      this.menuShown = !this.menuShown;
    },
    showCookbook: function () {
      this.cookbookShown = !this.cookbookShown;
    },
    showItemlist: function () {
      this.itemlistShown = !this.itemlistShown;
    },
    pushNewMeal: function () {
      this.cookBook.push({ name: this.newMeal, id: this.globalID, planned: true });
      this.globalID++;
      localStorage.setItem("globalID", this.globalID);
      localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
      this.newMeal = "";
    },
    pushNewGroceryItem: function () {
      this.groceryList.push({ name: this.newGroceryItem, id: this.globalID, planned: true });
      this.globalID++;
      localStorage.setItem("globalID", this.globalID);
      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
      this.newGroceryItem = "";
    },
    pushNewMealfromCookbook: function(array,element){
      const index = array
        .map(function (element) {
          return element.id;
        })
        .indexOf(element);
      this.cookBook[index].planned = true;

    },
    pushNewItemfromList: function(element){
      const index = this.groceryList.map(function(element){
        return element.id;
      }).indexOf(element);
      this.groceryList[index].planned = true;
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
        this.cookBook = [];
        localStorage.removeItem("cookbook");
      }
    },
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.groceryList = [];
        localStorage.removeItem("grocerylist");
      }
    },
    deleteCookbook: function(){
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.cookBook = [];
        localStorage.removeItem("cookbook");
        this.cookbookShown = false;
      }
    },
    deleteSingleItem: function (array, element) {
      const index = array
        .map(function (element) {
          return element.id;
        })
        .indexOf(element);
      array.splice(index, 1);
      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
    },
    checkSingleMeal: function (element) {

     
      const indexCookbook = this.cookBook.map(function (element){
        return element.id;
      }).indexOf(element);
      if(this.cookBook[indexCookbook]){
        this.cookBook[indexCookbook].planned = false;
      }
      localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
    },
  
  checkSingleItem: function (element) {
    const indexGrocerylist = this.groceryList.map(function(element){
      return element.id;}).indexOf(element);
    if(this.groceryList[indexGrocerylist]){
      this.groceryList[indexGrocerylist].planned = false;
    }
    localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
   }
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
  padding: 0;
}

p {
  font-size: 1.5em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
