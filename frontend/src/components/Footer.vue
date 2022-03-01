<template>
    <footer>
            <p>{{ copyright }}</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    computed: {
        copyright() {
      const currentYear = new Date().getFullYear();
      return `Copyright Groupomania ${currentYear}`;
    },
    }
}
</script>

<style>
footer {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0.5rem;
  width: 100%;
  color: white;
  font-style: italic;
  font-weight: lighter;
  font-size: 0.8rem;
}
</style>
