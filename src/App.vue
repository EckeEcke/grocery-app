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
              @show-details="showDetailpage"
            />
            <RandomRecipe
              v-if="cookbookShown"
              key="random"
            />
            <SupplyList
              v-if="!cookbookShown"
              key="component"
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
      @hide="hideDetailpage"
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
      menuShown: false,
      cookbookShown: false,
      showScrollBtn: false,
      hiddenDetailpage: true,
      detailedMeal: null,
      touchstartX: 0,
    };
  },
  computed: {
    groceryList() {
      return this.$store.getters.getGroceryList
    },
    cookBook() {
      return this.$store.getters.getMealPlan
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
  mounted() {
    const hasFaultyLocalStorageEntryItemList = localStorage.getItem("grocerylist") === "undefined" || 
                                       localStorage.getItem("grocerylist") === undefined ||
                                       localStorage.getItem("grocerylist") === "null"
    if (hasFaultyLocalStorageEntryItemList) {
      localStorage.removeItem("grocerylist")
    }
    const groceryListToPush = hasFaultyLocalStorageEntryItemList ? supplyListData : JSON.parse(localStorage.getItem("grocerylist"))
    this.$store.commit('setGroceryList', groceryListToPush)
    const hasFaultyLocalStorageEntryMealPlan = localStorage.getItem("mealPlan") === "undefined" || 
                                       localStorage.getItem("mealPlan") === undefined ||
                                       localStorage.getItem("mealPlan") === "null"
    if (hasFaultyLocalStorageEntryMealPlan) {
      localStorage.removeItem("mealPlan")
    }
    const mealPlanToPush = hasFaultyLocalStorageEntryMealPlan ? cookBookData : JSON.parse(localStorage.getItem("mealPlan"))
    this.$store.commit('setMealPlan', mealPlanToPush)
    new Konami(() => {
      runMario() 
    })
    this.$refs.app.addEventListener('touchstart', this.handleTouchStart, false)
    this.$refs.app.addEventListener('touchend', this.handleTouchEnd, false)
    const urlParams = new URLSearchParams(window.location.search)
    if(urlParams.get('view') === 'mealplan') this.cookbookShown = true
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
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.$store.commit('setGroceryList', [])
        localStorage.removeItem("grocerylist")
      }
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
  watch: {
    cookbookShown(val) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      const url = new URL(window.location.href)
      if (val === true) url.searchParams.set('view', 'mealplan') 
      if (val === false) url.searchParams.set('view', 'grocerylist')
      window.history.replaceState(null, null, url)
    }
  },
};

</script>
