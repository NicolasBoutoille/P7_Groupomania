<template>
    <img
        class="logo"
        src="../assets/icon-left-font-monochrome-white.svg"
        alt="Logo Groupomania"
    />
    <div class="line"></div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
header {
  width: 100%;
}

.logo {
  margin: 2rem 3rem;
  width: 200px;
}

.line {
  margin: auto;
  width: 85%;
  height: 0;
  border: 2px solid #C2595D;
}
</style>
