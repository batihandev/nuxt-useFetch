<!-- pages/contact.vue -->

<template>
  <div>
    <h1>Contact Us</h1>
    <form @submit.prevent="handleSubmit">
      <label>
        Name:
        <input v-model="formData.name" type="text" required />
      </label>
      <br />
      <label>
        Email:
        <input v-model="formData.email" type="email" required />
      </label>
      <br />
      <label>
        Message:
        <textarea v-model="formData.message" required></textarea>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const handleSubmit = async () => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Email sent successfully");
      // Handle success, e.g., redirect to a thank you page
    } else {
      console.error("Error sending email:", data.error);
      // Handle error, e.g., show an error message to the user
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>
