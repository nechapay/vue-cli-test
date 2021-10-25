<template>
  <div class="post">
    <div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Body: </strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="delPost">Delete</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      requred: true
    }
  },
  methods: {
    delPost() {
      this.$emit('remove', this.post)
    }
  }
}
</script>

<style scoped>
.post {
  border: 2px solid rgb(19, 88, 167);
  margin-top: 10px;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>