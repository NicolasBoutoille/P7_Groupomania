<template>
  <form class="post-create" @submit.prevent="createPost()">
    <div class="post-create__top">
      <img :src="user.profilePicture" alt="Photo de profil" />
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
        type="submit"
        value="Poster"
        class="post-create__btn"
      />
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "CreatePost",
  data() {
    return {
      textPublication: "",
      imagePublication: "",
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    processFile(event) {
      this.imagePublication = event.target.files[0];
    },
    createPost() {
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("image", this.imagePublication);
      formData.append("content", this.textPublication);
      formData.append("idUsers", this.$store.state.user.idUsers);
      fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
  },
};
</script>

<style>
.post-create {
  margin: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 550px;
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
  background: #ececec;
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
}

.post-create__btn:hover {
  filter: brightness(0.85);
  cursor: pointer;
}
</style>