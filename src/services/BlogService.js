import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
  async getAllBlogs() {
    try {
      const res = await api.get('/blogs')
      AppState.blogs = res.data.filter(c => c.creator != null)
      // eslint-disable-next-line no-console
      console.log(res.data)
      console.log(AppState.blogs)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  async getMyBlogs() {
    try {
      const res = await api.get('profile/blogs')
      AppState.myBlogs = res.data
      // eslint-disable-next-line no-console
      console.log(res.data)
      console.log(AppState.blogs)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  async getActiveBlog(blogId) {
    try {
      const res = await api.get('blogs/' + blogId)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
    // const blog = AppState.blogs.find(b => b._id === blogId)
    // AppState.activeBlog = blog
    // console.log(AppState.activeBlog)
  }

  async deleteBlog(blogId) {
    try {
      await api.delete('blogs/' + blogId)
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(newBlog) {
    try {
      await api.post('blogs/', newBlog)
      this.getMyBlogs()
    } catch (error) {
      console.error(error)
    }
  }

  async editBlog(id, updateBlog) {
    try {
      await api.put('blogs/' + id, updateBlog)
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(commentData) {
    try {
      await api.post('/comments', commentData)
    } catch (error) {
      console.error(error)
    }
  }

  async getComments(blogId) {
    try {
      const res = await api.get('blogs/' + blogId + '/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async editComment(id, updateComment) {
    try {
      await api.put('comments/' + id, updateComment)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(id) {
    try {
      await api.delete('comments/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}
export const blogService = new BlogService()
