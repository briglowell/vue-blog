<template>
  <div class="comment-component col-12 border shadow-lg">
    <button class="text-danger float-right close" @click="deleteComment()" v-if="comment.creatorEmail === profile.email">
      X
    </button>
    <h6>{{ comment.creatorEmail }}</h6>
    <form class="form-group" @submit.prevent="editComment" v-if="comment.creatorEmail === profile.email">
      <input type="text"
             class="form-control border border-0 bg-transparent text-white"
             aria-describedby="helpId"
             placeholder="Comment"
             v-model="state.updateComment.body"
      >
    </form>
    <p v-else>
      {{ comment.body }}
    </p>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { blogService } from '../services/BlogService'
import { AppState } from '../AppState'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: Object
  },
  setup(props) {
    const state = reactive({
      updateComment: {
        body: props.commentProp.body
      }
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      comment: computed(() => props.commentProp),
      deleteComment() {
        blogService.deleteComment(props.commentProp.id)
        blogService.getComments(props.commentProp.blog)
      },
      async editComment() {
        await blogService.editComment(this.comment.id, state.updateComment)
        blogService.getComments(this.comment.blog)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.bg-dark-fade{
  background-color: rgba(59, 59, 59, 0.473);
}

</style>
