<template>
  <div class="post" v-for="post in posts" :key="post.idPosts">
    <div class="post-header">
      <div class="post-header__picture">
        <div class="picture-container">
          <img :src="post.profilePicture" alt="Photo de profil" />
        </div>
      </div>
      <div class="post-header__content">
        <h2 class="username">
          {{ post.username }}
        </h2>
        <p class="dateOfPost">Posté le {{ formatDate(post.dateOfPost) }}</p>
      </div>
      <font-awesome-icon
        icon="xmark"
        class="post-header__delete"
        @click="deletePost(post.idPosts)"
        v-if="post.idUsers == user.idUsers || user.isAdmin == 1"
      />
    </div>
    <div class="post-line"></div>
    <div class="post-content">
      <p class="post-content__text">{{ post.content }}</p>
      <div v-if="post.imageUrl !== null " class="post-content__gif">
        <img :src="post.imageUrl" alt="Photo de post.idUsers" />
      </div>
    </div>
    <Comment :post="post.idPosts"></Comment>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue";
import { mapState } from "vuex";
export default {
  name: "Post",
  components: {
    Comment,
  },
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    forceRerender() {
      this.posts.reverse();
    },
    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2),
        month = datePart[1],
        day = datePart[2];
      return day + "/" + month + "/" + year;
    },
    deletePost(postId) {
      let token = localStorage.getItem("token");
      var result = confirm("Voulez-vous vraiment supprimer ce post ?");
      if (result == true) {
        event.preventDefault();
        fetch("http://localhost:3000/api/post/" + postId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            this.forceRerender();
            console.log(res);
          })
          .catch((error) => {
            return error;
          });
      }
    },
  },
  created() {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.result.map((post) => {
          this.posts.push({
            idPosts: post.idPosts,
            content: post.content,
            imageUrl: post.imageUrl,
            idUsers: post.idUsers,
            dateOfPost: post.dateOfPost,
            username: post.username,
            profilePicture: post.profilePicture,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.post {
  margin: 1rem;
  width: 100%;
  max-width: 750px;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.post-header {
  display: flex;
  padding: 0.5rem;
  position: relative;
}

.post-header:hover .post-header__delete {
  visibility: visible;
}

.picture-container {
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background: #cecece;
  overflow: hidden;
}

.picture-container img {
  max-width: 100%;
  max-height: 100%;
}

.post-header__content {
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.post-header__content h2 {
  font-size: 1rem;
}

.post-header__content p {
  font-weight: 300;
  color: black;
  font-size: 0.8rem;
}

.post-header__delete {
  position: absolute;
  right: 1rem;
  top: 1rem;
  visibility: hidden;
  cursor: pointer;
}

.post-line {
  width: 100%;
  height: 0;
  border: 0.5px solid #aaaa;
}

.post-content {
  padding: 1rem 1rem 0 1rem;
  overflow: hidden;
}

.post-content__gif {
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  width: 100%;
  border-radius: 5%;
  overflow: hidden;
}

.post-content__gif img {
  max-width: 600px;
  width: 100%;
}
</style>
