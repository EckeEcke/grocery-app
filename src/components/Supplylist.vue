<template>
  <div>
    <div class="container mt-3 mb-5">
      <div class="bg-warning rounded">
        <div class="container pt-1 pb-4">
          <h3 class="text-white">Grocery List</h3>
          <div class="input-group">
            <input
              class="form-control"
              type="text"
              v-model="newGroceryItem"
              placeholder="Add new grocery item"
              maxlength="30"
            />
            <div class="input-group-append">
              <button class="btn btn-primary search-btn" @click="formSubmit">
                <font-awesome-icon
                  :icon="['fas', 'plus']"
                  class="search-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.plannedItems.length == 0">
        <img
        class="illustration mt-5 mb-3"
        src="../assets/grocery-illustration.svg"
      />
      <p class="mb-3">
        Add new items or choose from your item list
      </p>
      </div>
      
      <div class="row">
        <p v-if="this.plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in">
            <span :key="plannedItems.length">{{
              plannedItems.length
            }}</span></transition
          >
          item(s) left
        </p>
      </div>
      <div v-if="plannedItems.length >= 1" class="pb-5">
        <transition-group name="slide-fade">
          <div
            class="row px-3"
            v-for="groceryItem in this.plannedItems"
            :key="groceryItem.id"
          >
            <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden">
              <button
                v-if="groceryItem"
                class="btn w-100 mx-0"
                :key="groceryItem.name"
                style="text-align: left"
                @click="checkItem(groceryItem.name)"
              > 
                <span v-if="groceryItem.quantity !== ''">{{ groceryItem.quantity }}</span>
                {{ groceryItem.name }}
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                @click="createModal(groceryItem)"
              >
                <font-awesome-icon
                  :icon="['fas', 'sort']"
                  class="trash-icon-item"
                />
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                @click="checkItem(groceryItem.name)"
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
      <div class="container my-5 pt-1 pb-4 bg-warning rounded">
        <h3 class="text-white">Item List</h3>
        <div>
          <input
            v-model="search"
            type="search"
            class="form-control"
            placeholder="Search item"
          />
        </div>
      </div>
      <div>
        <transition-group name="slide-fade">
          <div
            class="row px-3"
            v-for="item in this.filteredItems"
            :key="item.id"
          >
            <div class="col-11 text-nowrap overflow-hidden px-0 mx-0">
              <button
                class="btn w-100 mx-0 list-btn"
                :class="item.planned ? 'btn-success' : 'btn-outline-secondary'"
                :key="item.id"
                style="text-align: left"
                @click="someFunction(item.name)"
              >
                {{ item.name }}
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                @click="deleteItem({ array: listData, element: item.name })"
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
    </div>
    <img
      class="illustration mb-5"
      src="../assets/supplylist-illustration.svg"
    />
    <br />
    <button v-if="groceryList.length >= 1" class="btn btn-secondary mx-2 mb-1" @click="deleteGrocerylist">
      <font-awesome-icon :icon="['fas', 'trash-alt']" />Delete all
    </button>
    <transition name="fade">
      <Toast v-if="showToast" :message="message" />
    </transition>
    <Quantityinput v-if="showInput" :item="quantityItem" @hide="hideInput" :groceryList="groceryList" />
  </div>
</template>

<script>
import Toast from "./Toast.vue";
import Quantityinput from "./Quantityinput.vue";
export default {
  name: "Supplylist",
  components: {
    Toast,
    Quantityinput
  },
  props: {
    groceryList: {
      type: Array,
    },
    function: {
      type: Function,
    },
    function2: {
      type: Function,
    },
    deleteItem: {
      type: Function,
    },
    someFunction: {
      type: Function,
    },
    checkItem: {
      type: Function,
    }
  },
  data() {
    return {
      listData: this.groceryList,
      search: "",
      newGroceryItem: "",
      message: '',
      showToast: false,
      showInput: false,
      quantityItem: null
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
      return this.groceryList.filter((item) => item.planned == true);
    },
  },
  watch: {
    groceryList() {
      this.listData = this.groceryList;
    },
  },
  methods: {
    formSubmit(event) {
      event.preventDefault();
      if (this.newGroceryItem.length > 0) {
        this.$emit("submit", this.newGroceryItem);
        this.newGroceryItem = "";
      }
    },
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        this.groceryList = [];
        localStorage.removeItem("grocerylist");
        this.$emit('list-deleted')
        this.createToast()
      }
    },
    createToast: function () {
      this.message = "Item list was deleted"
      this.showToast = true
      setTimeout(() => this.showToast = false, 1500)
    },
    createModal: function (element) {
      document.documentElement.style.overflow = "hidden";
      this.quantityItem = element;
      this.showInput = true
    },
    hideInput: function () {
      this.showInput = false
      document.documentElement.style.overflow = "auto";
    }
  },
};
</script>