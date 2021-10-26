import axios from 'axios'
export const postModule = {
  namespaced: true,
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      )
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(post =>
        post.title.toLocaleLowerCase().includes(state.searchQuery.toLocaleLowerCase())
      )
    }
  },
  mutations: {
    setPosts(state, val) {
      state.posts = val
    },
    setLoading(state, val) {
      state.isPostsLoading = val
    },
    setSelectedSort(state, val) {
      state.selectedSort = val
    },
    setSearchQuery(state, val) {
      state.searchQuery = val
    },
    setPage(state, val) {
      state.page = val
    },
    setTotalPages(state, val) {
      state.totalPages = val
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true)
        const res = await axios.get('http://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        })
        commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
        commit('setPosts', res.data)
        commit('setLoading', false)
      } catch (error) {
        console.log(error.message)
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1)
        const res = await axios.get('http://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        })
        commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
        commit('setPosts', [...state.posts, ...res.data])
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}

export default {}
