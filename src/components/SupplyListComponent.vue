<template>
  <div class="pb-5">
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
      <div v-if="plannedItems && plannedItems.length == 0">
        <img
        class="illustration mt-5 mb-3"
        src="../assets/grocery-illustration.svg"
      />
      <p class="mb-4 p-3">
        Add new items or choose from your item list
      </p>
      </div>
      
      <div class="row container px-0">
        <p v-if="plannedItems && plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in">
            <span :key="plannedItems.length">{{
              plannedItems.length
            }}</span></transition
          >
          item(s) left
        </p>
      </div>
      <div v-if="plannedItems && plannedItems.length >= 1" class="pb-1 container">
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
                @click="checkSingleItem(groceryItem.name)"
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
                @click="checkItem(groceryItem)"
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
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-secondary my-4" @click="copyList">
          <font-awesome-icon :icon="['fas', 'copy']" class="trash-icon-item" /> Copy list
        </button>
        </div>
      </div>
      <div class="container mb-4 p-1 bg-warning">
        <h3 class="text-white m-2">Item List</h3>
      </div>
      <div class="container" v-if="filteredItemsByFirstLetter">
        <div v-for="(entry, index) in filteredItemsByFirstLetter" :key="index">
          <div class="mt-5 mb-3"><strong>{{ entry[0] }}</strong></div>
          <transition-group name="slide-fade">
          <div
            class="row px-3 hover-zoom"
            v-for="(item, index) in entry.filter(item => item.name)"
            :key="index"
          >
            <div class="col-11 text-nowrap overflow-hidden px-0 mx-0">
              <button
                class="btn w-100 mx-0 list-btn"
                :class="item.planned ? 'btn-success' : 'btn-outline-secondary'"
                :key="item.name"
                style="text-align: left"
                @click="pushNewItemfromList(item.name)"
              >
                {{ item.name }}
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                @click="deleteSingleItem(item)"
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
        <div class="d-flex justify-content-end my-4">
          <button v-if="groceryList.length >= 1" class="btn btn-outline-secondary mx-2 mb-1" @click="deleteGrocerylist">
            <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash-icon-item" /> Delete all
          </button>
        </div>
      </div>
    </div>
    <img
      class="illustration mb-5"
      src="../assets/supplylist-illustration.svg"
    />
    <QuantityInput v-if="showInput" :item="quantityItem" @hide="hideInput" :groceryList="groceryList" />
  </div>
</template>

<script>
import QuantityInput from "./QuantityInputComponent.vue";
export default {
  name: "SupplyList",
  components: {
    QuantityInput
  },
  data() {
    return {
      showInput: false,
      quantityItem: null,
      manualList: "",
      entriesByFirstLetter: [],
    };
  },
  computed: {
    groceryList: function() {
      return this.$store.getters.getGroceryList
    },
    filteredItemsForSuggestions: function () {
      if (this.currentInput === "") return this.groceryList
      const entriesIdenticalFirstLetter = this.groceryList.filter(item => item.name.charAt(0).toLowerCase() === this.currentInput.charAt(0).toLowerCase())
      const entriesNoIdenticalFirstLetter = this.groceryList.filter(item => item.name.charAt(0).toLowerCase() !== this.currentInput.charAt(0).toLowerCase())
      const sortedByFirstLetter = [...entriesIdenticalFirstLetter, ...entriesNoIdenticalFirstLetter]
      return sortedByFirstLetter.filter((item) => {
        return item.name.toLowerCase().includes(this.currentInput.toLowerCase());
      });
    },
    suggestedItems: function () {
        if (!this.filteredItemsForSuggestions) return []
        return this.filteredItemsForSuggestions.length > 5 ? this.filteredItemsForSuggestions.slice(0,10) : this.filteredItemsForSuggestions
    },
    plannedItems: function () {
      return this.groceryList.filter(function (item) { return item.planned == true})
    },
    currentInput: function () {
      return this.manualList.split(/,\s+|,|\n/).slice(-1).toString()
    },
    filteredItemsByFirstLetter: function () {
      return this.$store.getters.getSplitItemsByFirstLetter
    }
  },
  methods: {
    addNewItem: function (item) {
      this.$store.commit('addNewItem', item)
    },
    addNewItems: function (items) {
      items.forEach(item => this.addNewItem(item))
    },
    pushNewItemfromList: function (element) {
      const clonedGroceryList = [...this.groceryList]
      const index = clonedGroceryList
        .map(function (element) {
          return element.name;
        })
        .indexOf(element);
        this.$store.commit('setItemPlanned', index)
    },
    checkItem: function (element) {
      this.$store.commit('checkSingleItem', element)
    },
    checkSingleItem: function (element) {
      const clonedGroceryList = [...this.groceryList]
      console.log(clonedGroceryList)
      const indexGrocerylist = clonedGroceryList
        .map(function (element) {
          return element.name;
        })
        .indexOf(element);
      if (clonedGroceryList[indexGrocerylist]) {
        clonedGroceryList[indexGrocerylist].planned = false;
        clonedGroceryList[indexGrocerylist].quantity = '';
      }
      this.$store.commit('setGroceryList', clonedGroceryList)
      localStorage.setItem("grocerylist", JSON.stringify(clonedGroceryList));
    },
    copyList: function () {
      navigator.clipboard.writeText(this.plannedItems.map(item => item.name).join("\n"))
      this.$toast("Copied list to clipboard")
    },
    deleteGrocerylist: function () {
      let confirmed = confirm("Do you really want to delete your list?");
      if (confirmed) {
        localStorage.removeItem("grocerylist");
        this.$store.commit('setGroceryList', [])
        this.$toast("Item list was deleted")
      }
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
      console.log(newManualList)
      newManualList[newManualList.length - 1] = newValue + ","
      this.manualList = newManualList.toString()
      this.$refs.textarea.focus()
      this.resizeTextArea()
    },
    emitManualList: function () {
      const convertedToArray = this.manualList.split(/,\s+|,|\n/).map(entry => entry.replace(/, |,/g, ""))
      this.addNewItems(convertedToArray)
      this.manualList = ""
    },
    resizeTextArea() {
      let element = this.$refs["textarea"];

      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
    deleteSingleItem: function (element) {
      this.$store.commit('deleteSingleItem', element)
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