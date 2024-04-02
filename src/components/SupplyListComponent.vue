<template>
  <div class="pb-5">
    {{ currentInput }}
    <div class="mb-5">
      <div class="bg-warning">
        <div class="container py-4">
            <div class="input-group">
              <textarea ref="textarea" v-model="manualList" class="form-control" placeholder="Add item(s) - seperate by comma or line break" @input="resizeTextArea()">
              </textarea>
              <button @click="emitManualList" class="btn btn-primary">
                <font-awesome-icon
                      :icon="['fas', 'plus']"
                      class="search-icon"
                    />
              </button>
            </div>
          <div v-if="currentInput.length > 0 && filteredItemsForSuggestions.length > 0" class="text-start bg-light mt-3 p-2 rounded">
            <div v-for="item in suggestedItems" :key="item.id" @click="setInput(item.name)" class="cursor-pointer px-1 py-2 btn-outline-secondary">
              {{  item.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.plannedItems.length == 0">
        <img
        class="illustration mt-5 mb-3"
        src="../assets/grocery-illustration.svg"
      />
      <p class="mb-0 p-3">
        Add new items or choose from your item list
      </p>
      </div>
      
      <div class="row container px-0">
        <p v-if="this.plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in">
            <span :key="plannedItems.length">{{
              plannedItems.length
            }}</span></transition
          >
          item(s) left
        </p>
      </div>
      <div v-if="plannedItems.length >= 1" class="pb-5 container">
        <transition-group name="slide-fade">
          <div
            class="row px-3 hover-zoom"
            v-for="groceryItem in this.plannedItems"
            :key="groceryItem.id"
          >
            <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden hover-zoom">
              <button
                v-if="groceryItem"
                class="btn btn-outline-secondary w-100 mx-0"
                :key="groceryItem.name"
                style="text-align: left"
                @click="checkItem(groceryItem.name)"
              > 
                {{ groceryItem.name }}
                <span v-if="groceryItem.quantity !== ''">{{ groceryItem.quantity }}</span>
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
      <div class="container my-4 p-1 bg-warning">
        <h3 class="text-white m-2">Item List</h3>
      </div>
      <div class="container">
        <transition-group name="slide-fade">
          <div
            class="row px-3 hover-zoom"
            v-for="item in this.sortedItems"
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
    <QuantityInput v-if="showInput" :item="quantityItem" @hide="hideInput" @updated="updateQuantityInLocalStorage" :groceryList="groceryList" />
  </div>
</template>

<script>
import Toast from "./ToastComponent.vue";
import QuantityInput from "./QuantityInputComponent.vue";
export default {
  name: "SupplyList",
  components: {
    Toast,
    QuantityInput
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
      message: '',
      showToast: false,
      showInput: false,
      quantityItem: null,
      manualList: "",
    };
  },
  computed: {
    sortedItems: function () {
      let sortedArray = this.listData;
      return sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    },
    filteredItemsForSuggestions: function () {
      if (this.currentInput === "") return this.sortedItems
      const entriesIdenticalFirstLetter = this.sortedItems.filter(item => item.name.charAt(0).toLowerCase() === this.currentInput.charAt(0).toLowerCase())
      const entriesNoIdenticalFirstLetter = this.sortedItems.filter(item => item.name.charAt(0).toLowerCase() !== this.currentInput.charAt(0).toLowerCase())
      const sortedByFirstLetter = [...entriesIdenticalFirstLetter, ...entriesNoIdenticalFirstLetter]
      return sortedByFirstLetter.filter((item) => {
        return item.name.toLowerCase().includes(this.currentInput.toLowerCase());
      });
    },
    suggestedItems: function () {
      return this.filteredItemsForSuggestions.length > 5 ? this.filteredItemsForSuggestions.slice(0,10) : this.filteredItemsForSuggestions
    },
    plannedItems: function () {
      return this.groceryList.filter((item) => item.planned == true);
    },
    currentInput: function () {
      return this.manualList.split(/,\s+|,|\n/).slice(-1).toString()
    }
  },
  watch: {
    groceryList() {
      this.listData = this.groceryList;
    },
  },
  methods: {
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
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
    },
    setInput: function (newValue) {
      const newManualList = this.manualList.split(/,\s+|,|\n/)
      newManualList[newManualList.length - 1] = newValue + ","
      this.manualList = newManualList.toString()
      this.$refs.textarea.focus()
    },
    emitManualList: function () {
      const convertedToArray = this.manualList.split(/,\s+|,|\n/).map(entry => entry.replace(/, |,/g, ""))
      this.$emit("added-manual-list", convertedToArray)
      this.manualList = ""
    },
    resizeTextArea() {
      let element = this.$refs["textarea"];

      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
  },
};
</script>

<style scoped>
.hover-zoom {
  transition: all 0.3s;
}
.hover-zoom:hover {
  transform: translate(0.5%, -1%);
}

.cursor-pointer {
  cursor: pointer;
}

textarea {
  resize: none;
  overflow: hidden;
}

.toggle-btn {
  border-radius: 50rem;
}
</style>