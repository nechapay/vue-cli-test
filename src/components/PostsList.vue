<template>
  <div v-if="posts.length > 0">
    <h3>Posts list</h3>
    <div v-for="post in posts" :key="post.id"><post-item :post="post" @remove="$emit('remove', post)" /></div>
  </div>
  <div v-else><h3 style="color: red">There is no posts here, move along</h3></div>
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
  props: ['posts']
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
</style>