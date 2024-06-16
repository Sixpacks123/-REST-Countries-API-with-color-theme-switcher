<template>
  <UPage>
    <UContainer>
      <div class="my-6">
        <UButton label="Back" icon="i-heroicons-arrow-left" color="white" @click="router.back()"/>
      </div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="selectedCountry === null">Error: Failed to load country data.</div>
      <div v-else>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <img :src="selectedCountry.flags.svg" :alt="`Flag of ${selectedCountry.name.common}`" class="w-full h-auto object-contain"/>
          </div>
          <div class="m-8">
            <h3 class="text-4xl font-extrabold text-gray-900">{{ selectedCountry.name.common }}</h3>
            <div class="flex flex-row mt-4 gap-4">
              <div>
                <div class="mb-2"><strong>Native Name:</strong> {{ nativeName }}</div>
                <div class="mb-2"><strong>Population:</strong> {{ selectedCountry.population.toLocaleString() }}</div>
                <div class="mb-2"><strong>Region:</strong> {{ selectedCountry.region }}</div>
                <div class="mb-2"><strong>Sub Region:</strong> {{ selectedCountry.subregion }}</div>
                <div class="mb-2"><strong>Capital:</strong> {{ selectedCountry.capital }}</div>
              </div>
              <div>
                <div class="mb-2"><strong>Top Level Domain:</strong> {{ selectedCountry.tld.join(', ') }}</div>
                <div class="mb-2"><strong>Currencies:</strong> {{ formatCurrencies(selectedCountry.currencies) }}</div>
                <div><strong>Languages:</strong> {{ Object.values(selectedCountry.languages).join(', ') }}</div>
              </div>
            </div>
            <div class="flex gap-2 mt-4">
              <strong>Border Countries:</strong>
              <div v-for="border in selectedCountry.borders" :key="border">
                <UBadge :label="border" color="white"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </UPage>
</template>
<script setup>
import {computed} from 'vue';

const route = useRoute();
const router = useRouter();
const countryStore = useCountryStore();
const loading = computed(() => countryStore.loading);
const selectedCountry = computed(() => countryStore.selectedCountry);

// On component mount
  if (!countryStore.selectedCountry || route.params.name !== countryStore.selectedCountry.name.common) {
    await countryStore.fetchCountryByName(route.params.name);

  }

onBeforeUnmount(()=>{
  countryStore.resetSelectedCountry()
})

function formatCurrencies(currencies) {
  return Object.values(currencies).map(c => `${c.name} (${c.symbol})`).join(', ');
}
const nativeName = computed(() => {
  const nativeNames = selectedCountry.value?.name.nativeName;
  return nativeNames && nativeNames['fra'] ? `${nativeNames['fra'].common} (${nativeNames['fra'].official})` : 'No native name available';
});

</script>
