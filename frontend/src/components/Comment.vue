<template>
  <div class="comment">
    <button
      v-if="comments.length < 1"
      @click="showComments(post)"
      class="comment-display"
    >
      Afficher les commentaires
    </button>
    <div
      class="comment-list"
      v-for="comment in comments"
      :key="comment.idComments"
    >
      <div class="comment-list__picture">
        <img :src="comment.profilePicture" alt="Photo de profil" />
      </div>
      <font-awesome-icon
        icon="xmark"
        class="comment-list__delete"
        @click="deleteComment(comment.idComments)"
        v-if="comment.idUsers == user.idUsers || user.isAdmin == 1"
      />
      <div class="comment-list__content">
        <h3>{{ comment.username }}</h3>
        <p>{{ comment.content }}</p>
      </div>
    </div>
    <form class="comment-add" @submit.prevent>
      <input
        @keyup.enter="createComment()"
        v-model="commentaire"
        type="text"
        placeholder="Ajouter un commentaire..."
        aria-label="add-comment"
      />
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Comment",
  props: ["post"],
  data() {
    return {
      comments: [],
      commentaire: "",
    };
  },
  computed: {
    ...mapState(["user"]),
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
      let userId = this.user.idUsers;
      let postId = this.post;
      const data = {
        content: this.commentaire,
        idUsers: userId,
        idPosts: postId,
      };
      if (userId !== null) {
        fetch("http://localhost:3000/api/comment", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.comments.length = 0;
            this.showComments(postId);
            this.commentaire = "";
          })
          .catch((error) => {
            return error;
          });
      }
    },
    deleteComment(commentId) {
      let userId = this.user.idUsers;
      let Token = localStorage.getItem("token");
      let postId = this.post;
      if (userId !== null) {
        fetch("http://localhost:3000/api/comment/" + commentId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.comments.length = 0;
            this.showComments(postId);
          })
          .catch((error) => {
            return error;
          });
      }
    },
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
  position: relative;
}
.comment-list:hover .comment-list__delete {
  visibility: visible;
}
.comment-list__picture img {
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background: #cecece;
  overflow: hidden;
  margin-right: 1rem;
}
.comment-list__delete {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  visibility: hidden;
  cursor: pointer;
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
  margin: 0.5rem auto 1rem auto;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  border: none;
  background: #ececec;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
