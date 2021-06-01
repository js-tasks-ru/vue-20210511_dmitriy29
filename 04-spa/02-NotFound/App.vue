<template>
  <div id="app">
    <header v-if="!$route.params.pathMatch">
      <nav>
        <ul>
          <li><router-link to="/page-a" exact>/page-a</router-link></li>
          <li><router-link to="/page-b" exact>/page-b</router-link></li>
          <li><router-link to="/page-unknown">/page-unknown</router-link></li>
        </ul>
      </nav>
    </header>
    <main><router-view /></main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped></style>
