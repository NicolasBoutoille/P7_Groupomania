<template>
    <header>
    <img
      class="logo"
      src="../assets/icon-left-font-monochrome-white.svg"
      alt="Logo Groupomania"
    />
    <span class="logout" @click="switchToLogin()">
        Déconnexion
    </span>
    <div class="line"></div>
  </header>
</template>

<script>
export default{
    name: "Home",
    data: function () {
        return {

        };
    },
    computed: {

    },
    methods: {
        switchToLogin: function () {
      this.$router.push("/");
    }
    },
};
</script>

<style>
.logout {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 2.5rem 3rem;
    padding: 0.3rem 0.5rem;
    color: white;
    background: #C2595D;
    border-radius: 10px;
}
</style>
