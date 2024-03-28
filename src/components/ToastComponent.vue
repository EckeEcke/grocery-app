<template>
  <div class="toast-component">
    <div class="card">
      <div class="card-header bg-success" style="text-align: right"></div>
      <div class="card-body bg-white">
        <div class="card-text">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastComponent",
  props: {
    message: {
      type: String,
    }
  },
  mounted() {
    setTimeout(() => this.$emit('close'),2000)
  }
};
</script>

<style>
.toast-component {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  max-width: 95vw;
  z-index: 1;
}
</style>