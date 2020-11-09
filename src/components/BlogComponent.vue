<template>
  <div class="blog-component card bg-dark text-light col-2 offset-1 shadow-lg pt-3 my-2" v-if="blog.creator">
    <router-link :to="{name: 'ActiveBlog' , params: {blogId : blog._id}}">
      <img :src="blog.creator.picture" alt="//placehold.it/200" class="img-fluid">
    </router-link>
    <h1>{{ blog.title }}</h1>
    <h5>{{ blog.creator.name }}</h5>
  </div>
  <div class="col-1"></div>
</template>

<script>
import { computed } from 'vue'
// import { blogService } from '../services/BlogService'
// import router from '../router'
export default {
  name: 'BlogComponent',
  props: {
    blogProp: Object
  },
  setup(props) {
    return {
      blog: computed(() => props.blogProp)
      // async getActiveBlog() {
      //   blogService.getActiveBlog(this.blog._id)
      //   await router.push({ name: 'ActiveBlog', params: { blogId: this.blog._id } })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
