<template>
  <Header/>
  <header>
    <router-link to="/home">Home</router-link>
    <span class="logout" @click="logout()"> Déconnexion </span>
  </header>
  <div class="profil">
    <h1>{{user.username}}</h1>
    <div class="profil-image">
      <label for="image">
        <img class="image" :src="user.profilePicture" alt="Photo de profil" />
        <img
          class="add-image"
          src="../assets/add-images.svg"
          alt="Ajouter une photo"
        />
      </label>
      <input @change="modifyPicture($event)" class="input-image" id="image" type="file" name="image" accept="image/png, image/jpg, image/jpeg"/>
    </div>
    <form class="profil-info">
      <input
        v-model="newUsername"
        class="profil-info__input"
        name="username"
        type="text"
        label="username"
        :placeholder="user.username"
      />
      <input
        v-model="newEmail"
        class="profil-info__input"
        name="email"
        type="email"
        label="email"
        :placeholder="user.email"
      />
      <input
        v-model="newPassword"
        class="profil-info__input"
        name="password"
        type="password"
        label="password"
        placeholder="password"
      />
      <input
        @click="modifyProfil()"
        class="profil-info__btn"
        name="modify"
        label="modify"
        value="Modifier"
      />
      <input
        @click="confirmation()"
        class="profil-info__delete"
        name="delete"
        label="delete"
        value="Supprimer le compte"
      />
    </form>
  </div>
  <Footer/>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  name: "Profile",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: {
        idUsers: "",
        username: "",
        email: "",
        isAdmin: "",
        profilePicture: "",
      },
      newUsername: null,
      newEmail: null,
      newPassword: null,
      newImage: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/");
    },
    modifyPicture(event) {
        this.newImage = event.target.files[0];
        console.log(this.newImage);
        let Token = localStorage.getItem("token");
        let userId = localStorage.getItem("userId");
        let formData = new FormData();
        formData.append("image", this.newImage);
        if (userId !== null) {
            fetch("http://localhost:3000/api/user/" + userId, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + Token,
                },
                body: formData,
            })
            .then((res) => res.json())
            .then((res) => {
                this.$router.go();
                return res;
            })
            .catch((error) => {
                return error;
            })
        }
    },
    modifyProfil() {
      const data = {
        username: this.newUsername,
        email: this.newEmail,
        password: this.newPassword,
      };
      let userId = localStorage.getItem("userId");
      let Token = localStorage.getItem("token");
      if (userId !== null && data !== "") {
        fetch("http://localhost:3000/api/user/" + userId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.$router.go();
          })
          .catch((error) => {
            return error;
          });
      }
    },
    confirmation() {
      var result = confirm("Voulez-vous vraiment supprimer votre compte ?");
      if (result == true ){
        event.preventDefault();
        this.deleteProfil();
        this.logout()
      } else {
        this.$router.go();
      }
    },
    deleteProfil() {
      let userId = localStorage.getItem("userId");
      let Token = localStorage.getItem("token");
      if (userId !== null) {
        fetch("http://localhost:3000/api/user/" + userId, {
          method:"DELETE",
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            return error;
          })
      }
    }
  },
  mounted() {
    let userId = localStorage.getItem("userId");
    let Token = localStorage.getItem("token");
    if (userId !== null) {
      fetch("http://localhost:3000/api/user/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          (this.user.idUsers = res.result[0].idUsers),
            (this.user.username = res.result[0].username),
            (this.user.email = res.result[0].email),
            (this.user.isAdmin = res.result[0].isAdmin),
            (this.user.profilePicture = res.result[0].profilePicture);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
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
  filter: brightness(0.85);
}
a {
  position: absolute;
  top: 0px;
  right: 8rem;
  margin: 2.5rem 3rem;
  padding: 0.3rem 0.5rem;
  color: white;
  font-weight: 500;
  text-decoration: none;
}
.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1rem;
  margin: 2rem auto;
  width: 60%;
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
  filter: brightness(0.6);
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
  background: #c2595d;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.profil-info__delete:hover {
  cursor: pointer;
  filter: brightness(0.85);
}
</style>