<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  font-size: 16px;
  text-align: center;
  height: 48px;
  background-color: grey;
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

footer {
  font-size: 16px;
  text-align: center;
  height: 48px;
  background-color: grey;
  border-radius: 16px;
  place-content: center;
  margin-top: 16px;
}

@media (min-width: 1024px) {
  nav {
    font-size: 24px;
    height: 60px;
  }

  footer {
    height: 60px;
  }
}
</style>
