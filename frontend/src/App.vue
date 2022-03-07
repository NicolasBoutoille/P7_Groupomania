<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap");

* {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(62deg, #091F43 0%, #BE5059 200%);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}
</style>