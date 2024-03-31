<template>
  <div>
    <div class="backdrop" @click="$emit('hide')"></div>
    <div class="modal-detailpage card border-0">
      <h4 class="card-header bg-warning border-0 text-white">{{ item.name }}</h4>
      <div class="card-body" style="text-align: left">
        <p>How many/much of {{ item.name }} do you need?</p>
        <input ref="input" type="text" class="form-control" v-model="quantity" placeholder="Enter quantity (e.g. 5x, 1kg, 250ml)" />
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-secondary mx-3" @click="$emit('hide')">
          Cancel
        </button>
        <button class="btn btn-primary" @click="submit(item.name)">
          Submit and close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuantityInput",
  props: {
    item: {
      type: Object,
    },
    groceryList: {
        type: Array
    }
  },
  data() {
    return {
      quantity: "",
    };
  },
  mounted() {
      this.$refs.input.focus()
  },
  methods: {
    submit: function (element) {
      const indexGrocerylist = this.groceryList.findIndex(listitem => listitem.name === element)
        let clonedGroceryList = [...this.groceryList]
        clonedGroceryList[indexGrocerylist].quantity = this.quantity
        localStorage.setItem("grocerylist", JSON.stringify(clonedGroceryList))
        this.$emit("hide")
    },
  },
}
</script>