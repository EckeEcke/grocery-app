<template>
  <div id="app" ref="app">
    {{ cookbookShown }}
    <div style="position: relative">
      <h1 class="text-white mb-0 mb-sm-5">Vue Meal Planner</h1>
      <button
        v-if="!menuShown && !isStandAlone"
        id="toggle-nav-BTN"
        class="btn"
        style="font-size: 2em"
        @click="showMenu"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </div>

    <div class="container pb-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-6
            px-0 mx-auto bg-white">
        <div
          class="
            
            
            rounded
            no-br-mobile
             pb-4
            border-0
            card
            mb-0 mb-sm-5
          "
        >
          <div
            class="
              btn-toolbar
              no-br-top-mobile
              justify-content-center
              rounded-top
              no-br-mobile
              overflow-hidden
              sticky-mobile
              bg-white
            "
          >
            <div class="btn-group w-100" role="group">
              <button
                class="btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder"
                :class="{ inactive: cookbookShown }"
                @click="cookbookShown = false"
              >
                <h3 class="text-white mb-0 px-0">Grocery List</h3>
              </button>
              <button
                class="btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder"
                :class="{ inactive: !cookbookShown }"
                @click="cookbookShown = true"
              >
                <h3 class="text-white mb-0 px-0">Meal Plan</h3>
              </button>
            </div>
          </div>

          <transition-group name="fade">
            <CookBook
              v-if="cookbookShown"
              key="component"
              :cookBook="cookBook"
              :push="pushNewMealfromCookbook"
              :deleteItem="deleteSingleItem"
              :checkItem="checkSingleMeal"
              @submit="addNewMeal"
              @show-details="showDetailpage"
              @cb-deleted="emptyCookbook"
            />
            <RandomRecipe
              v-if="cookbookShown"
              key="random"
              @submit="addNewMeal" 
            />
            <SupplyList
              v-if="!cookbookShown"
              key="component"
              :groceryList="groceryList"
              :someFunction="pushNewItemfromList"
              :deleteItem="deleteSingleItem"
              :checkItem="checkSingleItem"
              @submit="addNewItem"
              @list-deleted="emptyItemlist"
              @added-manual-list="addNewItems"
            />
          </transition-group>
        </div>
        </div>
        <div class="col-12 col-md-10 col-lg-6 col-xl-5 mx-auto bg-white">
          <AboutContent />
        </div>
        
      </div>
    </div>
    <DetailPage
      v-if="!hiddenDetailpage"
      :meal="detailedMeal"
      :cookBook="cookBook"
      :groceryList="groceryList"
      @hide="hideDetailpage"
      @submit="addNewItem"
      @toggle="togglePlanned"
      @delete="deleteSingleItem"
    />
    <transition name="fade">
      <NavbarComponent v-if="menuShown" :menuShown="menuShown" @close="hideMenu" />
    </transition>
    <transition name="fade">
      <button
        v-if="showScrollBtn"
        class="scroll-btn btn bg-primary"
        @click="scrollToTop"
      >
        <font-awesome-icon :icon="['fas', 'chevron-up']" />
      </button>
    </transition>
  </div>
</template>

<script>
import RandomRecipe from "./components/RandomRecipe.vue";
import AboutContent from "./components/AboutContent.vue";
import NavbarComponent from "./components/NavigationComponent.vue";
import CookBook from "./components/CookBookComponent.vue";
import SupplyList from "./components/SupplyListComponent.vue";
import DetailPage from "./components/DetailPageComponent.vue";
import supplyListData from "./static/supplyListData.json";
import cookBookData from "./static/cookBookData.json";
import runMario from "running-mario";
import Konami from "konami";

export default {
  name: "App",
  components: {
    NavbarComponent,
    CookBook,
    SupplyList,
    RandomRecipe,
    AboutContent,
    DetailPage,
  },
  data: function () {
    return {
      groceryList:
        JSON.parse(localStorage.getItem("grocerylist")) || supplyListData,
      menuShown: false,
      cookbookShown: false,
      showScrollBtn: false,
      newMeal: "",
      newGroceryItem: "",
      cookBook: JSON.parse(localStorage.getItem("cookbook")) || cookBookData,
      hiddenDetailpage: true,
      detailedMeal: null,
      touchstartX: 0,
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
    isStandAlone() {
      return window.matchMedia('(display-mode: standalone)').matches
    }
  },
  created() {
    window.addEventListener("scroll", this.toggleScrollbutton);
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleScrollbutton);
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
      if (window.scrollY > window.innerHeight * 0.75) {
        this.showScrollBtn = true;
      } else {
        this.showScrollBtn = false;
      }
    },
    scrollToTop: function () {
      window.scrollTo(0, 0);
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
        this.groceryList[index].planned = !this.groceryList[index].planned;
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
      if (item.length === 0) return
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
    addNewItems: function (items) {
      items.forEach(item => this.addNewItem(item))
    },
    addNewMeal: function (item, ingredients) {
      let index = this.cookBook.findIndex((listItem) => listItem.name === item);
      if (index == -1) {
        this.cookBook.push({
          name: item,
          planned: true,
          id: this.newDishId,
          ingredients: ingredients,
        });
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
    deleteSingleItem: function (payload) {
      const array = payload.array;
      const element = payload.element;
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
        this.groceryList[indexGrocerylist].quantity = '';
      }
      localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
    },
    showDetailpage(meal) {
      this.detailedMeal = meal;
      this.hiddenDetailpage = false;
      document.documentElement.style.overflow = "hidden";
    },
    hideDetailpage() {
      this.hiddenDetailpage = true;
      document.documentElement.style.overflow = "auto";
    },
    emptyCookbook() {
      this.cookBook = []
    },
    emptyItemlist() {
      this.groceryList = []
    },
    handleTouchStart(event) {
      this.touchstartX = event.changedTouches[0].screenX
    },
    handleTouchEnd(event) {
      const touchendX = event.changedTouches[0].screenX
      if (touchendX < this.touchstartX) {
        this.cookbookShown = false
      } 
      if (touchendX > this.touchstartX) {
        this.cookbookShown = true
      }
    }
  },
  mounted() {
    new Konami(() => {
      runMario() 
    })
    this.$refs.app.addEventListener('touchstart', this.handleTouchStart, false)
    this.$refs.app.addEventListener('touchend', this.handleTouchEnd, false)
  },
  watch: {
    cookbookShown() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
  background-image: url("./assets/header.jpg");
  background-size: cover;
  padding: 2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-shadow: 1px 1px 1px black;
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
  background-image: linear-gradient(to bottom, #FEC47F, #ffc837);
  background: #F7F4EF;
}

#toggle-nav-BTN {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.toggle-btn {
  width: 150px;
  transition: 0.3s;
}

.toggle-btn.inactive {
  opacity: 0.4;
}

.toggle-btn.big:focus {
  background: #ffc107;
  border-color: #ffc107;
}

.toggle-btn.inactive.big {
  background: rgba(255, 193, 7, 0.5);
  border: none;
}

.toggle-btn.inactive h3 {
  color: black!important;
}

.toggle-btn.inactive.big:hover h3 {
  color: white!important;
}

.toggle-btn.big:hover {
  opacity: 1;
  background: #ffca2c;
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
  padding: 6px 12px;
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
  background: rgba(0, 0, 0, 0.4);
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
  transform: translateX(-50%) translateY(-50%);
}

.card-footer {
  text-align: right;
}

.input-group-append button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  z-index: 0;
}

.spinner-3 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #25b09b);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
}
@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}

@media (max-width: 500px) {
  #app {
    background-image: initial;
  }
  .no-br-top-mobile,
  .no-br-mobile {
    border-top-left-radius: 0!important;
    border-top-right-radius: 0!important;
  }

  .no-br-bottom-mobile,
  .no-br-mobile {
    border-bottom-left-radius: 0!important;
    border-bottom-right-radius: 0!important;
  }

  .sticky-mobile {
    position: sticky;
    top: 0;
    z-index: 10;
  }
}

.rounded-top-left {
  border-top-left-radius: .25rem;
}
.rounded-top-right {
  border-top-right-radius: .25rem;
}

</style>
