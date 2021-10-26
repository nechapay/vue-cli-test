<template>
  <div class="app__content">
    <h1>Posts page</h1>
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">Add posts</my-button>
      <my-select :model-value="selectedSort" :options="sortOptions" @update:model-value="setSelectedSort" />
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      dialogVisible: false
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
    //   })
    // }
    // page() {
    //   this.fetchPosts()
    // }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),

    addPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    }

    // changePage(page) {
    //   this.page = page
    // }
  }
}
</script>

<style scoped>
</style>