<template>
  <header>
    <span class="logout" @click="logout()"> Déconnexion </span>
  </header>
  <main>
    <div class="container">
      <CreatePost />
      <Post />
      <div></div>
    </div>
  </main>
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
export default {
  name: "Home",
  components: {
    CreatePost,
    Post,
  },
  data() {
    return {
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.logout {
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 2.5rem 3rem;
  padding: 0.3rem 0.5rem;
  color: white;
  background: #c2595d;
  font-weight: 500;
  border-radius: 10px;
}

.logout:hover {
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ececec;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1rem;
  max-width: 650px;
}
</style>
