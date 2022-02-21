<template>
  <header>
    <span class="logout" @click="logout()"> Déconnexion </span>
  </header>
  <main>
    <div class="container">
      <!-- <div class="create-post"></div> -->
      <div class="post" v-for="post in posts" :key="post.idPosts">
        <div class="post-header">
          <div class="post-header__picture">
            <div class="picture-container">
            <img :src="post.profilePicture" alt="Photo de profil" />
            </div>
          </div>
          <div class="post-header__content">
            <h2 class="username" @click="getAllPosts()">
              {{ post.username }}
            </h2>
            <p class="dateOfPost">{{ post.dateOfPost }}</p>
          </div>
        </div>
        <div class="post-line"></div>
        <div class="post-content">
          <p class="post-content__text">{{ post.content }}</p>
          <div class="post-content__gif">
            <img :src="post.imageUrl" alt="Photo de post.idUsers" />
            <p></p>
          </div>
        </div>
        <div class="post-comment" v-for="comment in comments" :key="comment.idPosts">
          <div class="post-comment__picture">
            <img :src="comment.profilePicture" alt="Photo de profil"/>
          </div>
          <div class="post-comment__content">
            <h3>{{ comment.username}}</h3>
            <p>{{ comment.cont}}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      posts: [
        // {
        //   idPosts: "",
        //   content: "",
        //   imageUrl: "",
        //   idUsers: "",
        //   dateOfPost: "",
        // },
      ],
      comments: [],
    };
  },
  computed: {},
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
  created() {
    let Token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
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
            profilePicture: post.profilePicture
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    let Token = localStorage.getItem('token');
    fetch("http://localhost:3000/api/comment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.result.map((comment) => {
          this.comments.push({
            idComments: comment.idComments,
            comment: comment.comment,
            idUsers: comment.idUsers,
            idPosts: comment.idPosts,
            dateOfComment: comment.dateOfComment,
            username: comment.username,
            profilePicture: comment.profilePicture
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
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

.create-post {
  margin: 1rem;
  max-width: 450px;
  background: #ececec;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.post {
  margin: 1rem;
  max-width: 450px;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.post-header {
  display: flex;
  padding: 0.5rem;
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
  color: #091f43;
}

.post-header__content p {
  font-weight: 300;
  color: #aaaa;
  font-size: 0.8rem;
}

.post-line {
  width: 100%;
  height: 0;
  border: 0.5px solid #aaaa;
}

.post-content {
  padding: 1rem;
  overflow: hidden;
}

.post-content__gif {
  display: flex;
  justify-content: center;
  margin: 1rem;
  max-width: 400px;
  border-radius: 5%;
  overflow: hidden;
}

.post-content__gif img {
  max-width: 400px;
}

.post-comment {
  display: flex;
  padding: 0.5rem;
}

.post-comment__picture {
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background: #cecece;
  overflow: hidden;
}

.post-comment__picture img {
  max-width: 100%;
  max-height: 100%;
}

.post-comment__content {
  width: 50%;
  border-radius: 10px;
  padding: 0 1rem;
  background: #ccd6dd;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.post-comment__content h3 {
  font-size: 0.9rem;
  color: #091f43;
}

.post-comment__content {
  font-size: 0.8rem;
}
</style>
