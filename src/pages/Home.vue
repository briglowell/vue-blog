<template>
  <div class="home container-fluid overflow-auto full-page hide-scroll">
    <h1 class="text-center text-white display-1">
      Shred Blogs
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

<style>
img {
  max-width: 100px;
}
.full-page{
  height: 90vh;
  padding-bottom: 10px;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
