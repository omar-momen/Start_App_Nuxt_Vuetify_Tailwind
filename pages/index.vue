<template>
  <div class="index-page">
    <h1 class="text-3xl font-bold underline text-primary">
      {{ $t("app.title") }}
    </h1>

    <v-btn color="primary" @click="useThemeStore().changeTheme('dark')"
      >Change Theme (Dark)</v-btn
    >
    <v-btn @click="useThemeStore().changeTheme('light')"
      >Change Theme (Light)</v-btn
    >

    <br />

    <v-btn @click="useLangStore().changeLang('en')"
      >Change Locale (English)</v-btn
    >
    <v-btn color="primary" @click="useLangStore().changeLang('ar')"
      >Change Locale (Arabic)</v-btn
    >

    {{ date }}
    <client-only>
      <v-date-picker color="primary" v-model="date"></v-date-picker>
    </client-only>
  </div>
</template>

<script setup>
const date = ref(null);
</script>

<style lang="scss" scoped></style>
