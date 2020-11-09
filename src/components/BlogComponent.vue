<template>
  <div class="blog-component bg-dark text-light col-3 shadow-lg pt-3 my-2 m-5" v-if="blog.creator">
    <router-link :to="{name: 'ActiveBlog' , params: {blogId : blog._id}}" class="text-white d-flex">
      <img :src="blog.creator.picture" alt="//placehold.it/200" class="img-fluid img-size mb-3">
      <div class="ml-3">
        <h2>{{ blog.title }}</h2>
        <h6>{{ blog.creator.name }}</h6>
      </div>
    </router-link>
  </div>
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
.img-size{
  height: 150px
}
</style>
