<template>
  <Header />
  <header>
    <font-awesome-icon
      icon="arrow-right-from-bracket"
      class="logout"
      @click="logout()"
    />
    <font-awesome-icon icon="user" class="user" @click="profile()" />
  </header>
  <main>
    <div class="container">
      <CreatePost />
      <Post />
      <div></div>
    </div>
  </main>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    CreatePost,
    Post,
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$store.commit("resetUserInfos");
      this.$router.push("/");
    },
    profile() {
      this.$router.push("/profile");
    },
  },
  mounted() {
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    this.$store.dispatch("getUser", { userId, token });
  },
};
</script>

<style scoped>
.logout {
  position: absolute;
  top: 2rem;
  right: 2rem;
  height: 1.5rem;
  padding: 0.3rem 0.5rem;
  color: white;
  background: #be5059;
  font-weight: 500;
  border-radius: 0.6rem;
}
.logout:hover {
  cursor: pointer;
  filter: brightness(0.85);
}
.user {
  position: absolute;
  top: 2rem;
  right: 5.5rem;
  height: 1.5rem;
  padding: 0.3rem 0.5rem;
  color: white;
  font-weight: 500;
}
.user:hover {
  cursor: pointer;
  filter: brightness(0.85);
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ececec;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2rem;
  max-width: 750px;
  width: 100%;
}
</style>
