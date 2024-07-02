<template>
  <div class="mt-56">
    <h1>Registrar</h1>
    <form @submit.prevent="handleRegister">
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
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "guest",
});

const { register } = useFirebaseAuth();

const form = reactive({
  email: "",
  password: "",
});

const handleRegister = async () => {
  try {
    await register(form.email, form.password);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
