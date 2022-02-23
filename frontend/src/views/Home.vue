<template>
  <header>
    <span class="logout" @click="logout()"> Déconnexion </span>
  </header>
  <main>
    <div class="container">
      <form class="post-create">
        <div class="post-create__top">
          <img src="../assets/blank-profile.png" alt="Photo de profil" />
          <input
            v-model="textPublication"
            class="post-create__text"
            type="text"
            placeholder="Quoi de neuf ?"
          />
        </div>
        <div class="post-create__bottom">
          <input
            @change="processFile($event)"
            class="post-create__img"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
          <input
            @click="createPost()"
            type="submit"
            value="Poster"
            class="post-create__btn"
          />
        </div>
      </form>
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
        <!-- <div class="post-comment">
          <div class="post-comment__picture">
            <img src="../assets/blank-profile.png" alt="Photo de profil" />
          </div>
          <div class="post-comment__content">
            <h3>Username</h3>
            <p>Comment</p>
          </div>
        </div> -->
        <input
          class="post-add__comment"
          type="text"
          placeholder="Ajouter un commentaire"
        />
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
      ],
      textPublication: "",
      imagePublication: ""

    }
  },
  computed: {},
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/");
    },
    processFile(event) {
    this.imagePublication = event.target.files[0]
    },
    createPost() {
      let Token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append('image', this.imagePublication);
      formData.append('content', this.textPublication);
      formData.append('idUsers', localStorage.getItem('userId'));
      fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token
        },
        body: formData,
      })
      .then((res) => res.json())
      .then((res) => {
        this.$router.push("/home");
        return res;
      })
      .catch((error) => {
        return error;
      })
    }
  },
  mounted() {
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

.post-create {
  margin: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.post-create__top {
  display: flex;
}

.post-create__top img {
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background: #cecece;
  overflow: hidden;
  margin-right: 1rem;
}

.post-create__top input {
  display: flex;
  justify-content: center;
  border: none;
  background: #ccd6dd;
  width: 90%;
  border-radius: 15px;
  padding: 0 0.8rem;
}

.post-create__bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.post-create__btn {
  padding: 0 1rem;
  border: none;
  border-radius: 5px;
  background: #091f43;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

.post-create__btn:hover {
  background: #2b4369;
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
  padding: 1rem 1rem 0 1rem;
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

.post-add__comment {
  display: flex;
  justify-content: center;
  margin: 0.5rem auto;
  padding: 0.3rem 0.8rem;
  width: 85%;
  background: #ccd6dd;
  border-radius: 15px;
  border: none;
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
}

.post-comment__content {
  font-size: 0.8rem;
}
</style>
