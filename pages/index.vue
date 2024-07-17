<template>
  <div class="index-page">
    <h1 class="text-5xl mb-5 font-bold underline text-primary">
      {{ $t("app.title") }}
    </h1>

    <ul class="flex gap-5">
      <nuxt-link to="/about">about</nuxt-link>
      <nuxt-link to="/terms">terms</nuxt-link>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
