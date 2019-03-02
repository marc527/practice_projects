<template>
  <div class="hello">
    <h1>Welcome to the Forum</h1>
    <div class="" v-for="thread in threads">
        <h3>{{ thread.title }}</h3>
        <div class="" v-for="postId in thread.posts">
          <h5>{{ users[posts[postId].userId].name }}</h5>
          <p>{{ posts[postId].text }}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      threads: this.$store.state.threads,
      posts: this.$store.state.posts,
      users: this.$store.state.users
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
