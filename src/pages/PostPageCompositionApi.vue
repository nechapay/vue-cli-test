<template>
  <div class="app__content">
    <h1>Posts page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">Add posts</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible"><post-form @create="addPost" /></my-dialog>
    <posts-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else><h4>Loading...</h4></div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostsList from '@/components/PostsList.vue'
import axios from 'axios'
import { ref } from 'vue'
import usePosts from '@/hooks/usePosts'

import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'by title' },
        { value: 'body', name: 'by body' }
      ]
    }
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10)
    const { sortedPosts, selectedSort } = useSortedPosts(posts)
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      totalPages,
      isPostsLoading,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
</style>