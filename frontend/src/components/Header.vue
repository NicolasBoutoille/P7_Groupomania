<template>
  <header>
    <img
      class="logo"
      src="../assets/icon-left-font-monochrome-white.svg"
      alt="Logo Groupomania"
    />
    <div class="line"></div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  width: 100%;
}
img {
  margin: 2rem;
  max-width: 200px;
}
.line {
  margin: auto;
  width: 85%;
  height: 0;
  border: 2px solid #be5059;
}
</style>
