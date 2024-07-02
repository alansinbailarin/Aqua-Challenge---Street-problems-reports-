<template>
  <div class="mt-56">
    <h1>Logear</h1>
    <form @submit.prevent="handleLogin">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        v-model="form.email"
      />
      <input
        type="password"
        name="pass"
        id="pass"
        placeholder="pass"
        v-model="form.password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "guest",
});

const { login } = useFirebaseAuth();
const form = reactive({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await login(form.email, form.password);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
