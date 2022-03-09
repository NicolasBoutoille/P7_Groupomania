<template>
  <Header />
  <main>
    <h1>La page demandée n'existe pas.</h1>
    <router-link to="/home"> Retourner à l'accueil</router-link>
  </main>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "NotFound",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
h1 {
  font-size: 3rem;
  color: white;
  margin: auto;
  text-align: center;
}
a {
  text-decoration: none;
  margin: 2.5rem 3rem;
  padding: 0.5rem 1rem;
  color: white;
  background: #be5059;
  font-weight: 500;
  border-radius: 10px;
}
</style>