<template>
  <main>
    <div class="card">
      <h1 class="card__title">Inscription</h1>
      <p class="card__subtitle">
        Tu as déjà un compte ?
        <span class="card__action" @click="switchToLogin()">Se connecter</span>
      </p>
      <form class="form">
        <div class="form-row">
          <input
            v-model="email"
            class="form-row__input"
            type="email"
            label="email"
            placeholder="Adresse mail"
          />
        </div>
        <div class="form-row">
          <input
            v-model="username"
            class="form-row__input"
            type="text"
            label="text"
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            class="form-row__input"
            type="password"
            label="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="form-error" v-if="errors.length > 0">{{ errors }}</div>
        <div class="form-success" v-if="success.length > 0">
          Inscription réussie !
          <span class="form-success__btn" @click="switchToLogin()"
            >Se connecter</span
          >
        </div>
        <div class="form-row">
          <input
            @click="createAccount()"
            type="submit"
            value="Créer mon compte"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Signup",
  data: function () {
    return {
      email: "",
      username: "",
      password: "",
      errors: "",
      success: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.email != "" && this.username != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    switchToLogin: function () {
      this.$router.push("/");
    },
    createAccount() {
      const data = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length > 0) {
            this.errors = res[0].msg;
          } else if (res.err) {
            this.errors = res.err;
          } else {
            this.errors = "";
            this.success = res.message;
            console.log(res.message);
          }
        });
    },
  },
};
</script>

<style>
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}

.form-row__input::placeholder {
  color: #aaaaaa;
}

.form-error {
  text-align: center;
  color: red;
  font-weight: 500;
}

.form-success {
  text-align: center;
  color: #1d9967;
  font-weight: 500;
}

.form-success__btn {
  text-decoration: underline;
  cursor: pointer;
}
</style>

