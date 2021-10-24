<template>
    <div id="app">
        <transition name="fade">
            <Navbar v-if="menuShown" :menuShown="menuShown" :toggleFunction="showMenu" />
        </transition>
    
        <button v-if="!menuShown" id="toggle-nav-BTN" class="btn" style="font-size: 2.5em" @click="showMenu">
                                              🍔
                                            </button>
    
        <h1 class="p-5 text-white mb-5">Meal Planner</h1>
        <br />
        <br />
    
        <div class="container">
            <div class="row">
                <button class="btn btn-primary mb-4 toggle-btn" @click="cookbookShown = !cookbookShown">
                    <span v-if="cookbookShown">Grocery List</span>
                    <span v-else>Meal Plan</span>
                </button>
            </div>
            <div class="row justify-content-center">
                <transition-group name="fade">
                    <Cookbook v-if="cookbookShown" key="component" :cookBook="cookBook" :function="showCookbook" :push="pushNewMealfromCookbook" :function2="deleteCookbook" :function3="deleteSingleItem" :checkItem="checkSingleMeal" @submit="addNewMeal"/>
                    <Supplylist v-if="!cookbookShown" key="component" :groceryList="groceryList" :function="showItemlist" :someFunction="pushNewItemfromList" :function2="deleteGrocerylist" :deleteItem="deleteSingleItem" :checkItem="checkSingleItem" @submit="addNewItem" />
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navigation.vue";
import Cookbook from "./components/Cookbook.vue";
import Supplylist from "./components/Supplylist.vue";
import supplylist from "./static/supplylist.json";
import cookbook from "./static/cookbook.json";





export default {
    name: "App",
    components: {
        Navbar,
        Cookbook,
        Supplylist,
    },
    data: function() {
        return {
            groceryList: JSON.parse(localStorage.getItem("grocerylist")) || supplylist,
            menuShown: false,
            cookbookShown: false,
            itemlistShown: false,
            newMeal: "",
            newGroceryItem: "",
            cookBook: JSON.parse(localStorage.getItem("cookbook")) || cookbook,
        };
    },
    computed: {
      newGroceryItemId() {
        if(this.groceryList.length) {
          return Math.max.apply(Math, this.groceryList.map(function(item) { return item.id; })) + 1
        } else return 0
      },
      newDishId() {
        if(this.cookBook.length) {
          return Math.max.apply(Math, this.cookBook.map(function(item) { return item.id; })) + 1
        } else return 0
      }
    },
    methods: {

        showMenu: function() {
            this.menuShown = !this.menuShown;
        },
        showCookbook: function() {
            this.cookbookShown = !this.cookbookShown;
        },
        showItemlist: function() {
            this.itemlistShown = !this.itemlistShown;
        },
        pushNewMeal: function() {
            let index = this.cookBook.findIndex(item => item.name === this.newMeal);
            if (index == -1) {
                this.cookBook.push({ name: this.newMeal, planned: true });
            } else {
                this.cookBook[index].planned = true;
            }

            localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
            this.newMeal = "";
        },
        pushNewGroceryItem: function() {
            let index = this.groceryList.findIndex(item => item.name === this.newGroceryItem);
            if (index == -1) {
                this.groceryList.push({ name: this.newGroceryItem, planned: true, id: this.newGroceryItemId });
            } else {

                this.groceryList[index].planned = true;
            }

            localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
            this.newGroceryItem = "";
        },
        pushNewMealfromCookbook: function(element) {
            const index = this.cookBook.map(function(element) {
                    return element.name;
                }).indexOf(element);
            if (this.cookBook[index].planned == false) {
                this.cookBook[index].planned = true;
            } else {
                this.cookBook[index].planned = false;
            }


        },
        pushNewItemfromList: function(element) {
            const index = this.groceryList.map(function(element) {
                return element.name;
            }).indexOf(element);
            if (this.groceryList[index].planned == false) {
                this.groceryList[index].planned = true;
            } else {
                this.groceryList[index].planned = false;
            }
        },
        formSubmit: function(event) {
            event.preventDefault();
            if (this.newGroceryItem.length > 0) {
                this.pushNewGroceryItem();
            }
            if (this.newMeal.length > 0) {
                this.pushNewMeal();
            }
        },
        addNewItem: function(item) {
            let index = this.groceryList.findIndex(listItem => listItem.name === item);
            if (index == -1) {
                this.groceryList.push({ name: item, planned: true, id: this.newGroceryItemId });
            } else {

                this.groceryList[index].planned = true;
            }

            localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
        },
        addNewMeal: function(item) {
            let index = this.cookBook.findIndex(listItem => listItem.name === item);
            if (index == -1) {
                this.cookBook.push({ name: item, planned: true, id: this.newDishId });
            } else {
                this.cookBook[index].planned = true;
            }

            localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
        },
        deleteGrocerylist: function() {
            let confirmed = confirm("Do you really want to delete your list?");
            if (confirmed) {
                this.groceryList = [];
                localStorage.removeItem("grocerylist");
                this.itemlistShown = false;
            }
        },
        deleteCookbook: function() {
            let confirmed = confirm("Do you really want to delete your list?");
            if (confirmed) {
                this.cookBook = [];
                localStorage.removeItem("cookbook");
                this.cookbookShown = false;
            }
        },
        deleteSingleItem: function(array, element) {
            const index = array
                .map(function(element) {
                    return element.name;
                })
                .indexOf(element);
            array.splice(index, 1);
            localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
        },
        checkSingleMeal: function(element) {


            const indexCookbook = this.cookBook.map(function(element) {
                return element.name;
            }).indexOf(element);
            if (this.cookBook[indexCookbook]) {
                this.cookBook[indexCookbook].planned = false;
            }
            localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
        },

        checkSingleItem: function(element) {
            const indexGrocerylist = this.groceryList.map(function(element) {
                return element.name;
            }).indexOf(element);
            if (this.groceryList[indexGrocerylist]) {
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
    font-weight: bolder;
    background-image: linear-gradient( to bottom, rgba(23, 23, 24, 0.52), rgba(31, 21, 28, 0.73)), url("./assets/food-header.jpg");
}

h3 {
    font-weight: bolder;
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

.toggle-btn {
    width: 160px;
    position: fixed;
    bottom: 0;
    right: calc(50vw - 80px);
    opacity: 0.6
}

.toggle-btn:hover {
    opacity: 1;
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

hr {
  margin: 0;
}

.illustration {
    width: 30%;
    min-width: 150px;
}

.link {
  cursor: pointer;
  color: blue;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

    {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */

    {
    transform: translateX(20px) translateY(5px) scale(0.5);
    opacity: 0;
}

.btn-outline-secondary, .btn-success {
  border-radius: 0;
}

.btn-outline-secondary {
  border: 0;
}

.delete-item-btn {
  border: 0;
  padding: 6px;
}

.delete-item-btn:hover {
  background-color: grey;
}
.trash-icon-item {
  color: grey;
  margin: 0;
}
button {
  font-size: 1em;
}
button:hover .trash-icon-item {
  color: white;
}

.search-btn {
  padding: 6px;
  font-size: 1em !important;
}
.search-icon {
  margin: 0 auto;
}
.trash-icon-item {
  color: grey;
  margin: 0;
}

  .centered-icon {
    margin: 0 auto;
  }
.check-btn {
  padding: 6px;
}
svg {
    color: white;
    margin-right: 8px;
}
</style>
