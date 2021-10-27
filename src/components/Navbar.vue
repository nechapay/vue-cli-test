<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="logo">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/composition')">Composition</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: teal;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}

.logo {
  cursor: pointer;
  background: rgba(19, 173, 26, 0.253);
  color: white;
  font-size: 200%;
  padding: 5px 10px;
  border-radius: 2px;
}
</style>