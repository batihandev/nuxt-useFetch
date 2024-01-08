<script setup>
const response1 = await useFetch(
  "https://jsonplaceholder.typicode.com/todos/1",
  {
    server: false,
  }
);
const data2 = ref(null);
onMounted(async () => {
  const response2 = await useFetch(
    "https://jsonplaceholder.typicode.com/todos/2",
    {
      server: false,
    }
  );
  data2.value = response2.data;
});
</script>
<template>
  <div class="flex flex-col">
    <div>{{ response1.data }}</div>
    <div>{{ data2 }}</div>
  </div>
</template>
