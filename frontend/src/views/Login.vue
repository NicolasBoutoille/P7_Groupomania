<template>
  <div class="logo">
    <img src="../assets/icon-left-font-monochrome-white.svg" alt="Logo Groupomania"/>
  </div>
  <div class="card">
    <h1 class="card_title">Connexion</h1>
    <p class="card_subtitle">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe">
    </div>
    <div class="form-row">
      <button class="button" :class="{'button--disabled' : !validatedFields}">
        Connexion
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
    }
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
      window.location.href="http://localhost:8080/#/signup";
    },
    createAccount: function () {
      console.log(this.email, this.username, this.password);
    },
  }
}
</script>

<style scoped>
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
</style>
