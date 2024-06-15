<template>
  <UHeader>
    <template #logo>
      <h1>Where in the World ?</h1>
    </template>

    <template #right>
      <UColorModeButton />

    </template>
  </UHeader>

  <UMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UMain>

  <UFooter />
</template>
<script setup lang="ts">
const countryStore = useCountryStore();
onMounted(async() => {
  await  nextTick();
  await countryStore.fetchCountries();
})
const links = [{
  label: 'Documentation',
  icon: 'i-heroicons-book-open',
  to: '/getting-started'
}, {
  label: 'Playground',
  icon: 'i-simple-icons-stackblitz',
  to: '/playground'
}, {
  label: 'Roadmap',
  icon: 'i-heroicons-map',
  to: '/roadmap'
}, {
  label: 'Pro',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/pro'
}, {
  label: 'Releases',
  icon: 'i-heroicons-rocket-launch',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}]

</script>
