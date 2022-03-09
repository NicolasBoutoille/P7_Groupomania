import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      user: {
        idUsers: "",
        email: "",
        username: "",
        profilePicture: "",
        isAdmin: ""
      },
    };
  },
  mutations: {
    collectUserInfos(state, { userId, token }) {
      fetch("http://localhost:3000/api/user/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          state.user.idUsers = res.result[0].idUsers,
            state.user.email = res.result[0].email,
            state.user.username = res.result[0].username,
            state.user.profilePicture = res.result[0].profilePicture,
            state.user.isAdmin = res.result[0].isAdmin;
        })
        .catch((error) => {
          return error;
        });
    },
    resetUserInfos(state) {
      state.user.idUsers = "",
        state.user.email = "",
        state.user.username = "",
        state.user.profilePicture = "",
        state.user.isAdmin = ""
    },
  },
  actions: {
    getUser(context, { userId, token }) {
      context.commit('collectUserInfos', { userId, token })
    }
  },
})
