<template>
  <div class="comment">
    <button
      @click="showComments(post)"
      class="comment-display"
    >
      Afficher les commentaires
    </button>
    <div class="comment-list" v-for="comment in comments" :key="comment.idComments">
      <div class="comment-list__picture">
        <img :src="comment.profilePicture" alt="Photo de profil" />
      </div>
      <div class="comment-list__content">
        <h3>{{comment.username}}</h3>
        <p>{{comment.content}}</p>
      </div>
    </div>
    <form class="comment-add" :action="showComments()">
      <input v-model="commentaire" type="text" placeholder="Ajouter un commentaire" />
      <input @click="createComment()" type="submit" value="Poster">
    </form>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ['post'],
  data() {
    return {
      comments: [],
      commentaire: "",
    };
  },
  methods: {
    showComments(postId) {
      let Token = localStorage.getItem("token");
      fetch("http://localhost:3000/api/comment/" + postId, {
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
              content: comment.content,
              idUsers: comment.idUsers,
              dateOfComment: comment.dateOfComment,
              username: comment.username,
              profilePicture: comment.profilePicture,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createComment() {
      let Token = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      const data = {
        content: this.commentaire,
        idUsers: userId,
        idPosts: this.post
      };
      if (userId !== null) {
        fetch("http://localhost:3000/api/comment", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((error) => {
          return error;
        })
      }
    }
  },
};
</script>

<style>
.comment-display {
  margin: 0.5rem auto;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  border: none;
  background: #091f43;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

.comment-display:hover {
  filter: brightness(0.85);
}
.comment {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment-list {
  display: flex;
  background: #ececec;
  padding: 0.3rem;
  margin: 0.5rem 1rem;
  border-radius: 10px;
}

.comment-list__picture img {
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background: #cecece;
  overflow: hidden;
  margin-right: 1rem;
}

.comment-list__content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.comment-list__content h3 {
  font-size: 0.9rem;
}
.comment-list__content p {
  font-size: 0.8rem;
}

.comment-add {
  display: flex;
  justify-content: center;
}

.comment-add input {
  width: 85%;
  margin: 0.5rem auto;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  border: none;
  background: #ececec;
}
</style>
