import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      posts: [
        {
          idPosts: "",
          content: "",
          imageUrl: "",
          idUsers: "",
          dateOfPost: ""
        }
      ]
    };
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
