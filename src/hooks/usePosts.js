import axios from 'axios'
import { ref, onMounted } from 'vue'

export default function usePosts(limit) {
  const posts = ref([])
  const totalPages = ref(0)
  const isPostsLoading = ref(true)
  const fetching = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: 1,
          _limit: limit
        }
      })
      totalPages.value = Math.ceil(res.headers['x-total-count'] / limit)
      posts.value = res.data
      isPostsLoading.value = false
    } catch (error) {
      console.log(error.message)
    }
  }

  onMounted(fetching)

  return {
    posts,
    isPostsLoading,
    totalPages
  }
}
