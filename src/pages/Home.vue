<template>
  <div class="home container-fluid">
    <h1 class="text-center">
      Blogs
    </h1>
    <div class="row justify-content-center">
      <blog-component v-for="blog in allBlogs" :key="blog._id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { blogService } from '../services/BlogService'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import BlogComponent from '../components/BlogComponent'

export default {
  name: 'Home',
  components: { BlogComponent },
  setup() {
    onMounted(() => {
      blogService.getAllBlogs()
    })
    return {
      allBlogs: computed(() => AppState.blogs)
    }
  }
}
</script>
