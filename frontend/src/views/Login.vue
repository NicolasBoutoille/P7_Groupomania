<template>
  <main>
    <div class="card">
      <h1 class="card__title">Connexion</h1>
      <p class="card__subtitle">
        Tu n'as pas encore de compte ?
        <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span>
      </p>
      <form class="form">
        <div class="form-row">
          <input
            v-model="email"
            class="form-row__input"
            type="email"
            placeholder="Adresse mail"
            required
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            class="form-row__input"
            type="password"
            placeholder="Mot de passe"
            required
          />
        </div>
        <div class="form-row__error" v-if="errors.length > 0">{{ errors }}</div>
        <div class="form-row">
          <input
            @click="login()"
            type="submit"
            value="Connexion"
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
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    switchToCreateAccount: function () {
      this.$router.push("/signup");
    },
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      fetch("http://localhost:3000/api/login", {
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
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("token", res.token);
            this.errors = "";
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.form-row {
  position: relative;
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

.form-row__error {
  text-align: center;
  color: red;
  font-weight: 500;
}
</style>
