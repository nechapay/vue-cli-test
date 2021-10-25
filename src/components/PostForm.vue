<template>
  <div>
    <form @submit.prevent class="form">
      <h3>Add post</h3>
      <my-input type="text" v-model="post.title" placeholder="post title" />
      <my-input class="input" type="text" v-model="post.body" placeholder="post body" />
      <my-button class="btn" @click="addPost">Add</my-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: { id: null, title: '', body: '' }
    }
  },
  methods: {
    addPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        id: null,
        title: '',
        body: ''
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

.form {
  display: flex;
  flex-direction: column;
}

.input {
  margin-top: 10px;
  width: 100%;
  padding: 10px 15px;
}

.input:focus {
  border: 2xp solid;
}

.btn {
  align-self: flex-end;
  padding: 10px 15px;
  border: 1px solid #afa;
  margin-top: 10px;
}
</style>