<template>
  <div v-if="posts.length > 0">
    <h3>Posts list</h3>
    <transition-group name="post-list">
      <div v-for="post in posts" :key="post.id"><post-item :post="post" @remove="$emit('remove', post)" /></div>
    </transition-group>
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

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.2s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>