<template>
  <div id="app">
    <button
      v-if="!menuShown"
      id="toggle-nav-BTN"
      class="btn"
      style="font-size: 2em"
      @click="showMenu"
    >
      🍔
    </button>

    <h1 class="text-white mb-0 mb-sm-5">Meal Planner</h1>

    <div class="container pb-5">
      <div class="row justify-content-center">
        <div
          class="
            col-sm-12 col-md-10 col-lg-5
            bg-white
            pb-4
            px-0
            rounded
            mx-auto
            border-0
            card
            mb-0
            mb-sm-5
          "
        >
          <div
            class="
              btn-toolbar
              mb-3
              p-4
              justify-content-center
              card-header
              bg-dark
            "
          >
            <div class="btn-group" role="group">
              <button
                class="btn btn-warning toggle-btn"
                :class="{ inactive: !cookbookShown }"
                @click="cookbookShown = true"
              >
                <span>Meal Plan</span>
              </button>
              <button
                class="btn btn-warning toggle-btn"
                :class="{ inactive: cookbookShown }"
                @click="cookbookShown = false"
              >
                <span>Grocery List</span>
              </button>
            </div>
          </div>

          <transition-group name="fade">
            <Cookbook
              v-if="cookbookShown"
              key="component"
              :cookBook="cookBook"
              :push="pushNewMealfromCookbook"
              :function2="deleteCookbook"
              :deleteItem="deleteSingleItem"
              :checkItem="checkSingleMeal"
              @submit="addNewMeal"
              @show-details="showDetailpage"
            />
            <Supplylist
              v-if="!cookbookShown"
              key="component"
              :groceryList="groceryList"
              :someFunction="pushNewItemfromList"
              :function2="deleteGrocerylist"
              :deleteItem="deleteSingleItem"
              :checkItem="checkSingleItem"
              @submit="addNewItem"
            />
          </transition-group>
        </div>
        <Random />
      </div>
    </div>
    <Detailpage v-if="!hiddenDetailpage" :meal="detailedMeal" :cookBook="cookBook" :groceryList="groceryList" @hide="hideDetailpage" @submit="addNewItem" @toggle="togglePlanned" @delete="deleteSingleItem" />
    <transition name="fade">
      <Navbar v-if="menuShown" :menuShown="menuShown" @close="hideMenu" />
    </transition>
    <transition name="fade">
      <button v-if="showScrollBtn" class="scroll-btn btn bg-primary" @click="scrollToTop"><font-awesome-icon
            :icon="['fas', 'chevron-up']"
          /></button>
    </transition> 
  </div>
</template>

<script>
import Random from "./components/Random.vue";
import Navbar from "./components/Navigation.vue";
import Cookbook from "./components/Cookbook.vue";
import Supplylist from "./components/Supplylist.vue";
import Detailpage from "./components/Detailpage.vue";
import supplylist from "./static/supplylist.json";
import cookbook from "./static/cookbook.json";


export default {
  name: "App",
  components: {
    Navbar,
    Cookbook,
    Supplylist,
    Random,
    Detailpage
  },
  data: function () {
    return {
      groceryList:
        JSON.parse(localStorage.getItem("grocerylist")) || supplylist,
      menuShown: false,
      cookbookShown: true,
      showScrollBtn: false,
      newMeal: "",
      newGroceryItem: "",
      cookBook: JSON.parse(localStorage.getItem("cookbook")) || cookbook,
      hiddenDetailpage: true,
      detailedMeal: null
    };
  },
  computed: {
    newGroceryItemId() {
      if (this.groceryList.length) {
        return (
          Math.max.apply(
            Math,
            this.groceryList.map(function (item) {
              return item.id;
            })
          ) + 1
        );
      } else return 0;
    },
    newDishId() {
      if (this.cookBook.length) {
        return (
          Math.max.apply(
            Math,
            this.cookBook.map(function (item) {
              return item.id;
            })
          ) + 1
        );
      } else return 0;
    },
  },
  created () {
    window.addEventListener('scroll', this.toggleScrollbutton);
  },
  destroyed () {
    window.removeEventListener('scroll', this.toggleScrollbutton);
  },
  methods: {
    showMenu: function () {
      this.menuShown = true;
      document.documentElement.style.overflow = "hidden";
    },
    hideMenu: function () {
      this.menuShown = false;
      document.documentElement.style.overflow = "auto";
    },
    toggleScrollbutton: function () {
      if ( window.scrollY > window.innerHeight*0.75) {
        this.showScrollBtn = true
      } else {
        this.showScrollBtn = false
      }
    },
    scrollToTop: function() {
      window.scrollTo(0,0)
    },
    showCookbook: function () {
      this.cookbookShown = !this.cookbookShown;
    },
    pushNewMeal: function () {
      let index = this.cookBook.findIndex((item) => item.name === this.newMeal);
      if (index == -1) {
        this.cookBook.push({ name: this.newMeal, planned: true });
      } else {
        this.cookBook[index].planned = true;
      }

      localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
      this.newMeal = "";
    },
    pushNewGroceryItem: function () {
      let index = this.groceryList.findIndex(
        (item) => item.name === this.newGroceryItem
      );
      if (index == -1) {
        this.groceryList.push({
          name: this.newGroceryItem,
          planned: true,
          id: this.newGroceryItemId,
        });
      } else {
        this.groceryList[index].planned = true;
      }

      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
      this.newGroceryItem = "";
    },
    togglePlanned: function (item) {
      let index = this.groceryList.findIndex(
        (listItem) => listItem.name === item
      );
      if (index >= 0) {
        this.groceryList[index].planned = !this.groceryList[index].planned
      }
    },
    pushNewMealfromCookbook: function (element) {
      const index = this.cookBook
        .map(function (element) {
          return element.name;
        })
        .indexOf(element);
      if (this.cookBook[index].planned == false) {
        this.cookBook[index].planned = true;
      } else {
        this.cookBook[index].planned = false;
      }
    },
    pushNewItemfromList: function (element) {
      const index = this.groceryList
        .map(function (element) {
          return element.name;
        })
        .indexOf(element);
      if (this.groceryList[index].planned == false) {
        this.groceryList[index].planned = true;
      } else {
        this.groceryList[index].planned = false;
      }
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
    addNewItem: function (item) {
      let index = this.groceryList.findIndex(
        (listItem) => listItem.name === item
      );
      if (index == -1) {
        this.groceryList.push({
          name: item,
          planned: true,
          id: this.newGroceryItemId,
        });
      } else {
        this.groceryList[index].planned = true;
      }

      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
    },
    addNewMeal: function (item, ingredients) {
      let index = this.cookBook.findIndex((listItem) => listItem.name === item);
      if (index == -1) {
        this.cookBook.push({ name: item, planned: true, id: this.newDishId, ingredients: ingredients });
      } else {
        this.cookBook[index].planned = true;
      }

      localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
    },
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.groceryList = [];
        localStorage.removeItem("grocerylist");
      }
    },
    deleteCookbook: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.cookBook = [];
        localStorage.removeItem("cookbook");
      }
    },
    deleteSingleItem: function (payload) {
      const array = payload.array
      const element = payload.element
      const index = array
        .map(function (element) {
          return element.name;
        })
        .indexOf(element);
      array.splice(index, 1);
      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
    },
    checkSingleMeal: function (element) {
      const indexCookbook = this.cookBook
        .map(function (element) {
          return element.name;
        })
        .indexOf(element);
      if (this.cookBook[indexCookbook]) {
        this.cookBook[indexCookbook].planned = false;
      }
      localStorage.setItem("cookbook", JSON.stringify(this.cookBook));
    },

    checkSingleItem: function (element) {
      const indexGrocerylist = this.groceryList
        .map(function (element) {
          return element.name;
        })
        .indexOf(element);
      if (this.groceryList[indexGrocerylist]) {
        this.groceryList[indexGrocerylist].planned = false;
      }
      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
    },
    showDetailpage(meal) {
      this.detailedMeal = meal
      this.hiddenDetailpage = false
      document.documentElement.style.overflow = "hidden";
    },
    hideDetailpage() {
      this.hiddenDetailpage = true
      document.documentElement.style.overflow = "auto";
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito");
@font-face {
  font-family: "niceFont";
  src: url("./assets/niceFont.ttf");
}

h1 {
  font-family: niceFont;
  font-weight: bolder;
  background-image: linear-gradient(
      to bottom,
      rgba(23, 23, 24, 0.52),
      rgba(31, 21, 28, 0.73)
    ),
    url("./assets/food-header.jpg");
  padding: 2rem;
}

@media (max-width: 500px) {
  h1 {
    padding: 1rem;
    text-align: left;
  }
}

h3 {
  font-weight: bolder;
  padding: 12px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Nunito", sans-serif;
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
  width: 150px;
  transition: 0.3s;
}

.toggle-btn.inactive {
  opacity: 0.4;
  background: orange;
  border-color: orange;
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
  width: 100%;
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

.scroll-btn {
  position: fixed;
  right: 12px;
  bottom: 12px;
  background: white;
}

.scroll-btn svg {
  margin: 0;
}

.font-small {
  font-size: 0.8rem;
  text-align: right;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px) translateY(5px) scale(0.5);
  opacity: 0;
}

.btn-outline-secondary,
.btn-success {
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
.accordion-icon {
  color: black;
  transition: 0.3s;
  display: block;
  margin: 0 auto;
}
.flipped {
  transform: rotate(180deg);
}

p {
  font-size: 1em;
}
button:hover .trash-icon-item {
  color: white;
}
svg {
  color: white;
  margin-right: 8px;
}

.dish-image {
  width: 90%; 
  margin-left: 0;
}

.dish-text {
  text-align: left;
}

.backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    top: 0;
    left: 0;
    z-index: 1;
}

.modal-detailpage {
  position: fixed;
  width: 500px;
  max-width: 95vw;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%) translateY(-50%)
}

.card-footer {
  text-align: right;
}

.input-group-append button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.spinner-3 {
  width:50px;
  height:50px;
  border-radius:50%;
  background:conic-gradient(#0000 10%,#25b09b);
  -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  animation:s3 1s infinite linear;
}
@keyframes s3 {to{transform: rotate(1turn)}}

</style>
