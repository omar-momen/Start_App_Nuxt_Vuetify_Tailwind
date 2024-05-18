<template>
  <div clas="error-page">
    <main class="main">
      <div class="wrapper">
        <NuxtImg
          width="300"
          height="300"
          :src="imgSrc"
          :alt="error?.statusCode + ' error'"
        />

        <h1>{{ title }}</h1>
        <p>
          {{ errorDescription }}
        </p>

        <base-button @click="handleError">{{ btn }}</base-button>
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    required: true,
    type: Object,
  },
});

const handleError = () => {
  clearError();
  window.location.href = "/"; // redirect to home
};

const imgSrc = computed(() => {
  if (props.error.statusCode == 404) {
    return `/images/errors/404.png`;
  } else if (props.error.statusCode == 500) {
    return `/images/errors/500.png`;
  } else {
    return `/images/errors/no_internet.png`;
  }
});

const { $i18n: locele } = useNuxtApp();

const title = computed(() => {
  if (props.error.statusCode == 404)
    return locele.t("pages.error.notFound.title");
  if (props.error.statusCode == 500)
    return locele.t("pages.error.serverErr.title");
  else return locele.t("pages.error.else.title");
});

const errorDescription = computed(() => {
  if (props.error.statusCode == 404)
    return locele.t("pages.error.notFound.desc");
  if (props.error.statusCode == 500)
    return locele.t("pages.error.serverErr.desc");
  else return locele.t("pages.error.else.desc");
});

const btn = computed(() => {
  if (props.error.statusCode == 404)
    return locele.t("pages.error.notFound.btn");
  if (props.error.statusCode == 500)
    return locele.t("pages.error.serverErr.btn");
  else return locele.t("pages.error.else.btn");
});
</script>
