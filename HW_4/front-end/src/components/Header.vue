<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="navbar">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Contact us</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  font-size: 16px;
  text-align: center;
  height: 48px;
  background-color: var(--color-background-soft);
  border-radius: 16px;
  place-content: center;
  margin-bottom: 16px;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    font-size: 24px;
    height: 60px;
  }
}
</style>