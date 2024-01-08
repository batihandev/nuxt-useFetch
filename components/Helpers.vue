<script setup>
// refresh the page to see the difference
const refresh = () => {
  console.log("refresh");
  window.location.reload();
};
</script>
<template>
  <div class="flex items-center justify-center gap-5 flex-wrap m-5">
    <nuxt-link to="/">Home NUXT LINK</nuxt-link>
    <nuxt-link to="/contact">CONTACT NUXTLINK</nuxt-link>
    <a href="/">Home A HREF</a>
    <a href="/contact">CONTACT A HREF</a>
    <button @click="refresh">Refresh</button>
  </div>
</template>
