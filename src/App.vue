<template>
  <div id="app" ref="app">
    <header class="box-shadow position-relative mb-0 mb-sm-5">
      <div class="container d-flex justify-content-between">
        <h1 class="text-white">Vue Meal Planner</h1>
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
    </header>

    <div class="container pb-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-6 px-0 mx-auto bg-white box-shadow">
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
        <div class="col-12 col-md-10 col-lg-6 col-xl-5 mx-auto bg-white box-shadow">
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
    <NavbarComponent v-if="menuShown" :menuShown="menuShown" @close="hideMenu" class="container" />
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
      this.touchstartY = event.changedTouches[0].screenY
    },
    handleTouchEnd(event) {
      const touchendX = event.changedTouches[0].screenX
      const touchendY = event.changedTouches[0].screenY
      if (!(touchendY <= this.touchstartY + 40 && touchendY >= this.touchstartY - 40)) return
      if (touchendX + 60 < this.touchstartX) {
        this.cookbookShown = true
      } 
      if (touchendX - 60 > this.touchstartX) {
        this.cookbookShown = false
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
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  },
};

</script>
