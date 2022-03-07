<template>
  <Header />
  <main>
    <div class="card">
      <h1 class="card__title">Connexion</h1>
      <p class="card__subtitle">
        Tu n'as pas encore de compte ?
        <span class="card__action" @click="switchToCreateAccount()"
          >Créer un compte</span
        >
      </p>
      <form class="form" @submit.prevent="login()">
        <div class="form-row">
          <input
            v-model="email"
            class="form-row__input"
            type="email"
            aria-label="email"
            placeholder="Adresse mail"
            required
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            class="form-row__input"
            type="password"
            aria-label="password"
            placeholder="Mot de passe"
            required
          />
        </div>
        <div class="form-row__error" v-if="errors.length > 0">
          {{ errors }}
        </div>
        <div class="form-row">
          <input
            type="submit"
            value="Connexion"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
          />
        </div>
      </form>
    </div>
  </main>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Login",
  components: {
    Header,
    Footer,
  },
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
            // localStorage.setItem("userId", res.userId);
            localStorage.setItem("token", res.token);
            this.errors = "";
            let userId = res.userId;
            let token = res.token;
            this.$store.dispatch('getUser', {userId, token})
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
main {
  display: flex;
}
.card {
  vertical-align: middle;
  margin: auto;
  width: 600px;
  background: white;
  border-radius: 10px;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card__title {
  text-align: center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}

.button {
  background-color: #091f43;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s filter;
}

.card__action {
  color: #BE5059;
  text-decoration: underline;
}

.card__action:hover {
  cursor: pointer;
}

.button:hover {
  cursor: pointer;
  filter: brightness(0.85);
}

.button--disabled {
  background: #737373;
  color: white;
}

.button--disabled:hover {
  cursor: not-allowed;
  background: #737373;
}

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
