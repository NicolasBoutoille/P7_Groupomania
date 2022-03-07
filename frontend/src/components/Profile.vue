<template>
  <Header />
  <header>
    <font-awesome-icon
      icon="arrow-right-from-bracket"
      class="logout"
      @click="logout()"
    />
    <font-awesome-icon icon="house" class="home" @click="home()" />
  </header>
  <div class="profil">
    <h1>{{ user.username }}</h1>
    <div class="profil-image">
      <label for="image">
        <img class="image" :src="user.profilePicture" alt="Photo de profil" />
        <font-awesome-icon icon="image" class="add-image" />
      </label>
      <input
        @change="modifyPicture($event)"
        class="input-image"
        id="image"
        type="file"
        name="image"
        accept="image/png, image/jpg, image/jpeg"
      />
    </div>
    <form class="profil-info">
      <input
        v-model="newUsername"
        class="profil-info__input"
        name="username"
        type="text"
        aria-label="username"
        :placeholder="user.username"
      />
      <input
        v-model="newEmail"
        class="profil-info__input"
        name="email"
        type="email"
        aria-label="email"
        :placeholder="user.email"
      />
      <input
        v-model="newPassword"
        class="profil-info__input"
        name="password"
        type="password"
        aria-label="password"
        placeholder="password"
      />
      <input
        @click="modifyProfil()"
        class="profil-info__btn"
        name="modify"
        aria-label="modify"
        value="Modifier"
      />
      <input
        @click="confirmation()"
        class="profil-info__delete"
        name="delete"
        aria-label="delete"
        value="Supprimer le compte"
      />
    </form>
  </div>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "Profile",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      newUsername: null,
      newEmail: null,
      newPassword: null,
      newImage: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      // localStorage.removeItem("userId");
      this.$store.commit("RESET_USER_INFOS");
      console.log(this.$store.state.user);
      this.$router.push("/");
    },
    home() {
      this.$router.push("/home");
    },
    modifyPicture(event) {
      this.newImage = event.target.files[0];
      let token = localStorage.getItem("token");
      let userId = this.user.idUsers;
      let formData = new FormData();
      formData.append("image", this.newImage);
      if (userId !== null) {
        fetch("http://localhost:3000/api/user/" + userId, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            this.$store.dispatch('getUser', {userId, token});
            return res;
          })
          .catch((error) => {
            return error;
          });
      }
    },
    modifyProfil() {
      const data = {
        username: this.newUsername,
        email: this.newEmail,
        password: this.newPassword,
      };
      let userId = this.user.idUsers;
      let token = localStorage.getItem("token");
      if (userId !== null && data !== "") {
        fetch("http://localhost:3000/api/user/" + userId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.$store.dispatch('getUser', {userId, token});
          })
          .catch((error) => {
            return error;
          });
      }
    },
    confirmation() {
      var result = confirm("Voulez-vous vraiment supprimer votre compte ?");
      if (result == true) {
        event.preventDefault();
        this.deleteProfil();
        this.logout();
       }
    },
    deleteProfil() {
      let userId = this.user.idUsers;
      let token = localStorage.getItem("token");
      if (userId !== null) {
        fetch("http://localhost:3000/api/user/" + userId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            return error;
          });
      }
    },
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
  background: #BE5059;
  font-weight: 500;
  border-radius: 0.6rem;
}

.logout:hover {
  cursor: pointer;
  filter: brightness(0.85);
}

.home {
  position: absolute;
  top: 2rem;
  right: 5.5rem;
  height: 1.5rem;
  padding: 0.3rem 0.5rem;
  color: white;
  font-weight: 500;
}

.home:hover {
  cursor: pointer;
  filter: brightness(0.85);
}
.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  width: 80%;
  max-width: 650px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1rem;
  margin: 5rem auto;
}
.profil h1 {
  font-size: 2rem;
  margin: 1rem;
}
.profil-image {
  width: 100px;
  height: 100px;
  margin: 1rem;
  overflow: hidden;
  position: relative;
}
.profil-image:hover {
  cursor: pointer;
  filter: brightness(0.8);
}
.profil-image:hover .add-image {
  visibility: visible;
  cursor: pointer;
}
.image {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
}
.add-image {
  position: absolute;
  top: 50px;
  left: 50px;
  transform: translate(-50%, -50%);
  visibility: hidden;
  color: white;
  height: 1.5rem;
}
.input-image {
  display: none;
}
.profil-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  margin: 1rem;
}
.profil-info input {
  margin: 0.5rem;
  border: none;
  border-radius: 15px;
  padding: 0 0.8rem;
  height: 1.5rem;
  text-align: center;
}
.profil-info__input {
  background: #ececec;
}
.profil-info__btn {
  background: #091f43;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.profil-info__btn:hover {
  cursor: pointer;
  filter: brightness(0.85);
}
.profil-info__delete {
  background: #BE5059;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.profil-info__delete:hover {
  cursor: pointer;
  filter: brightness(0.85);
}
</style>