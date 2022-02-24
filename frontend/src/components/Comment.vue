<template>
  <div class="comment">
    <button class="comment-show">Afficher les commentaires</button>
    <div class="comment-list">
      <div class="comment-list__picture">
        <img src="../assets/blank-profile.png" />
      </div>
      <div class="comment-list__content">
        <h3>username</h3>
        <p>content</p>
      </div>
    </div>
    <form class="comment-add">
      <input type="text" placeholder="Ajouter un commentaire" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      comments: [],
    }
  },
  created() {
      let Token = localStorage.getItem("token");
      let id = 35;
      fetch("http://localhost:3000/api/comment/" + id, {
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
              profilePicture: comment.profilePicture
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
.comment {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment-show {
  margin: 0.5rem auto;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  border: none;
  background: #091f43;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

.comment-show:hover {
  background: #2b4369;
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
