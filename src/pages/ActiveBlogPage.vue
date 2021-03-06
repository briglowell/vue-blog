<template>
  <div class="container-fluid full-page overflow-auto hide-scroll">
    <div class="row justify-content-center">
      <div class="active-blog offset-2 col shadow-lg text-center my-3 bg-dark-fade text-white">
        <img :src="activeBlog.creator.picture" alt="" class="img-fluid mt-4" v-if="activeBlog.creator">
        <h1>{{ activeBlog.title }}</h1>
        <h5 v-if="activeBlog.creator">
          By: {{ activeBlog.creator.name }}
        </h5>
        <div class="col-12">
          <div class="col-10 offset-1 text-left">
            <p class="my-4">
              {{ activeBlog.body }}
            </p>
          </div>
          <button type="button" class="btn btn-primary m-2" data-toggle="modal" data-target="#exampleModal" v-if="activeBlog.creatorEmail === profile.email">
            edit blog
          </button>
          <button class="btn btn-danger" @click="deleteBlog" v-if="activeBlog.creatorEmail === profile.email">
            delete
          </button>
          <div class="row">
            <form class="form-group d-flex col-12 mt-4" @submit.prevent="createComment">
              <input type="text"
                     class="form-control"
                     aria-describedby="helpId"
                     placeholder="Comment"
                     v-model="state.newComment.body"
              >
              <button type="submit" class="btn btn-info ml-1 col-2">
                add comment
              </button>
            </form>
          </div>
          <div class="comment-height overflow-auto hide-scroll">
            <comment-component v-for="comment in comments" :key="comment" :comment-prop="comment" />
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit your blog
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="form-group" type="onsubmit">
            <input type="text"
                   class="form-control border border-dark bg-dark-fade"
                   aria-describedby="helpId"
                   placeholder="Blog Title"
                   v-model="state.updateBlog.title"
            >
            <input type="text"
                   class="form-control border border-dark bg-dark-fade"
                   aria-describedby="helpId"
                   placeholder="Blog Body"
                   v-model="state.updateBlog.body"
            >
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-primary" data-dismiss="modal" @click.prevent="editBlog">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { useRoute } from 'vue-router'
import router from '../router'
import CommentComponent from '../components/CommentComponent'

export default {
  name: 'ActiveBlog',
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: {
        blog: route.params.blogId,
        creatorEmail: AppState.profile.email
      },
      updateBlog: {}
    })
    onMounted(async() => {
      await blogService.getActiveBlog(route.params.blogId)
      await blogService.getComments(route.params.blogId)
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      activeBlog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      async deleteBlog() {
        await blogService.deleteBlog(route.params.blogId)
        router.push({ name: 'Home' })
      },
      async createComment() {
        await blogService.createComment(state.newComment)
        blogService.getComments(route.params.blogId)
      },
      async editBlog() {
        await blogService.editBlog(route.params.blogId, state.updateBlog)
        blogService.getActiveBlog(route.params.blogId)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>
img {
  max-height: 4500px;
}
.full-page{
  height: 90vh;
}

.comment-height{
  max-height: 40vh;
}

.bg-dark-fade{
  background-color: rgba(59, 59, 59, 0.473);
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
