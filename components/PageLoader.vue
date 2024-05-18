<template>
  <div class="page_loader">
    <Preloader />
  </div>
</template>

<script setup></script>

<style  scoped>
.page_loader {
  background-color: var(--main-bg);
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
