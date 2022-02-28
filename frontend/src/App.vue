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
  background-image: linear-gradient(62deg, #091F43 0%, #C2595D 200%);
  backdrop-filter: blur(5px) opacity(0.8);
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.card {
  margin: 1rem;
  width: 540px;
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
  color: #C2595D;
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
  background: #cecece;
  color: white;
}

.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>