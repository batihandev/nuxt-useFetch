<script setup>
const data1 = ref(null);
const data2 = ref(null);
const data3 = ref(null);
const data4 = ref(null);
const data5 = ref(null);
const data6 = ref(null);
const data7 = ref(null);
const data8 = ref(null);
const fetchData = async () => {
  // process.client or server false makes no difference
  if (process.client) {
    const response1 = await useFetch(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        server: false,
      }
    );
    data1.value = response1.data;
  }
  const response2 = await useFetch(
    "https://jsonplaceholder.typicode.com/todos/2"
  );
  data2.value = response2.data;

  const response3 = await useFetch(
    "https://jsonplaceholder.typicode.com/todos/3"
  );
  data3.value = response3.data;
  const response4 = await useFetch(
    "https://jsonplaceholder.typicode.com/todos/4"
  );
  data4.value = response4.data;
};
const fetchData2 = async () => {
  data5.value = await useFetch("https://jsonplaceholder.typicode.com/todos/5");
  data6.value = await useFetch("https://jsonplaceholder.typicode.com/todos/6", {
    server: false,
  });
  data7.value = await useFetch("https://jsonplaceholder.typicode.com/todos/7");
  data8.value = await useFetch("https://jsonplaceholder.typicode.com/todos/8");
};
onMounted(async () => {
  // await nextTick(); solves the issue
  await fetchData();
  await fetchData2();
});
</script>
<template>
  <div class="flex flex-col gap-2 px-5 my-5">
    <div>Problem happens on page refresh or when using AHREF.</div>
    <div>
      The first fetch calls inside my two functions won't register in onMounted.
      Which are data1 and data5.
    </div>
    <div>
      They do register if you use onBeforeMounted, but that may cause another
      problem when working with other components.
    </div>
    <div>
      If you write "await fetchData" in onMounted, first fetch will be missing
      which is data1 but rest will be there.
    </div>
    <div>
      If you change anything in code and save while in dev mode all fetches work
      for once.
    </div>
    <div>
      I added await in both functions because that should be the correct way.
      Still first fetch is missing on page refresh
    </div>
    <div>Using nextTick() solves the problem.</div>
    <div class="flex flex-col gap-2 bg-blue-300">
      <div>FUNCTION 1 Making 4 fetches</div>
      <div class="bg-blue-200 flex flex-col gap-2">
        <div>{{ data1 }}</div>
        <div>{{ data2 }}</div>
        <div>{{ data3 }}</div>
        <div>{{ data4 }}</div>
      </div>
    </div>
    <div class="flex flex-col gap-2 bg-blue-300">
      <div>FUNCTION 2 Making 4 fetches</div>
      <div class="bg-blue-200 flex flex-col gap-2">
        <div>{{ data5 }}</div>
        <div>{{ data6 }}</div>
        <div>{{ data7 }}</div>
        <div>{{ data8 }}</div>
      </div>
    </div>
  </div>
</template>
