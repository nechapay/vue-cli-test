<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  align-self: flex-end;
  padding: 10px 15px;
  border: 1px solid rgb(19, 88, 167);
  cursor: pointer;
  margin: 2px;
}
</style>