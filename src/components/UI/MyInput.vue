<template>
  <input class="input" type="text" @input="updateInput" :value="modelValue" />
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(evt) {
      this.$emit('update:modelValue', evt.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 10px;
  width: 100%;
  padding: 10px 15px;
}

.input:focus {
  border: 2xp solid;
}
</style>