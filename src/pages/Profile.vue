<template>
  <div class="about text-center full-page container-fluid">
    <h1 class="text-light">
      {{ profile.name }}
    </h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <div class="col-6 offset-3">
      <form class="form-group" @submit.prevent="createBlog">
        <input type="text"
               class="form-control border"
               aria-describedby="helpId"
               placeholder="Blog Title"
               v-model="state.newBlog.title"
        >
        <input type="text"
               class="form-control"
               aria-describedby="helpId"
               placeholder="Blog Body"
               v-model="state.newBlog.body"
        >
        <button type="submit" class="btn btn-info mt-3">
          New Blog
        </button>
      </form>
    </div>
    <h1>My Blogs:</h1>
    <div class="row justify-content-center">
      <blog-component v-for="blog in myBlogs" :key="blog._id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import BlogComponent from '../components/BlogComponent'

export default {
  name: 'Profile',
  components: { BlogComponent },

  setup() {
    onMounted(() => {
      blogService.getMyBlogs()
    })
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      myBlogs: computed(() => AppState.myBlogs),
      createBlog() {
        blogService.createBlog(state.newBlog)
      }
    }
  }
}

</script>

<style scoped>
img {
  max-width: 100px;
}
.full-page{
  height: 90vh;
}
</style>
