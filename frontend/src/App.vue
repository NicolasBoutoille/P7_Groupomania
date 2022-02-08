<template>
  <div id="nav">
    <!-- <router-link to="/">Login</router-link> |
    <router-link to="/about">Signup</router-link> -->
  </div>
  <router-view/>
</template>

<style>

* {
  font-family: 'Avenir', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
body {
  background-color: #091F43;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}
img {
  position: absolute;
  top: 30px;
  left: 30px;
  height: 50px;
}
.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
}
.card__title {
  text-align:center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
</style>