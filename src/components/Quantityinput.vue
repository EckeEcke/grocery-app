<template>
  <div>
    <div class="backdrop" @click="$emit('hide')"></div>
    <div class="modal-detailpage card border-0">
      <h4 class="card-header bg-dark border-0 text-warning">{{ item.name }}</h4>
      <div class="card-body" style="text-align: left">
        <p>How many/much of {{ item.name }} do you need?</p>
        <input type="text" class="form-control" v-model="quantity" />
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-secondary mx-3" @click="$emit('hide')">
          Cancel
        </button>
        <button class="btn btn-warning" @click="submit(item.name)">
          Submit and close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quantityinput",
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
  methods: {
    submit: function (element) {
      const indexGrocerylist = this.groceryList.findIndex(listitem => listitem.name === element)
        this.groceryList[indexGrocerylist].quantity = this.quantity;
        console.log(this.groceryList[indexGrocerylist])
        localStorage.setItem("grocerylist", JSON.stringify(this.groceryList));
        this.$emit("hide");
    },
  },
};
</script>