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
    <!-- <div class="page__wrapper">
        <div
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{ 'current-page': page === pageNumber }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostsList from '@/components/PostsList.vue'
import axios from 'axios'

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'by title' },
        { value: 'body', name: 'by body' }
      ]
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      )
    }
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
    addPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = res.data
        this.isPostsLoading = false
      } catch (error) {
        console.log(error.message)
      }
    },
    async loadMorePosts() {
      try {
        this.page++
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.page
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...res.data]
      } catch (error) {
        console.log(error.message)
      }
    }
    // changePage(page) {
    //   this.page = page
    // }
  }
}
</script>

<style scoped>
</style>