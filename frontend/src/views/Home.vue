<template>
  <header>
    <span class="logout" @click="switchToLogin()"> Déconnexion </span>
  </header>
  <main>
    <div class="container">
      <!-- <div class="create-post"></div> -->
      <div class="post">
        <div class="post-header">
          <div class="post-header__picture">
            <div class="picture-container">
              <img src="../assets/blank-profile.png" alt="Profile Picture" />
            </div>
          </div>
          <div class="post-header__content">
            <h2 class="username" @click="getAllPosts()">Username</h2>
            <p class="dateOfPost">Publié le O2/02/22</p>
          </div>
        </div>
        <div class="post-line"></div>
        <div class="post-content">
          <p class="post-content__text">Hello Michael !</p>
          <div class="post-content__gif">
            <img src="../assets/giphy.gif" alt="Michael Scott" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      post: {}
    };
  },
  computed: {
  },
  methods: {
    switchToLogin: function () {
      this.$router.push("/");
    },
    getAllPosts() {
      let Token = localStorage.getItem("token");
      fetch("http://localhost:3000/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + Token,
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
    }
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
  background: red;
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
</style>
