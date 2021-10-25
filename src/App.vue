<template>
  <div class="app">
    <div class="app__content">
      <h1>Posts page</h1>
      <div class="app__btns">
        <my-button @click="showDialog">Add posts</my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>
      <my-dialog v-model:show="dialogVisible"><post-form @create="addPost" /></my-dialog>
      <posts-list :posts="posts" @remove="removePost" v-if="!isPostsLoading" />
      <div v-else><h4>Loading...</h4></div>
    </div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostsList from './components/PostsList.vue'
import axios from 'axios'

export default {
  components: { PostForm, PostsList },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'by title' },
        { value: 'body', name: 'by body' }
      ]
    }
  },
  mounted() {
    this.fetchPosts()
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
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = res.data
        this.isPostsLoading = false
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

.app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

.app__content {
  width: 50%;
}

.app__btns {
  margin: 15px;
  display: flex;
  justify-content: space-between;
}
</style>