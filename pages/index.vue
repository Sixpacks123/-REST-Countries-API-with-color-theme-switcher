<template>
  <UContainer>
    <UPage>
      <!-- Search and filter section -->
      <div class="flex flex-col md:flex-row justify-between items-center my-6">
        <!-- Search input -->
        <div class="mb-4 md:mb-0">
          <UInput v-model="searchQuery" placeholder="Search for a country..."
                  icon="i-heroicons-magnifying-glass-20-solid" size="xl" />
        </div>
        <!-- Continent filter dropdown -->
        <div>
          <USelect v-model="continentFilter" :options="countriesOptions" placeholder="Filter by Region" option-attribute="name" />
        </div>
      </div>

      <!-- Countries grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Country card -->
        <UCard v-for="country in filteredCountries" :key="country.cca3" @click="redirection(country.name.common)" :ui="{ body: { padding: '' } }">
          <!-- Full border flag -->
          <div class="relative h-1/3">
            <img :src="country.flags.svg" :alt="`Flag of ${country.name.common}`" class="w-full h-40 object-cover rounded-t-lg" />
          </div>
          <div class="country-info p-6 my-4">
            <h2 class="country-name font-bold text-lg mb-2">{{ country.name.common }}</h2>
            <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
            <p><strong>Region:</strong> {{ country.region }}</p>
            <p><strong>Capital:</strong> {{ country.capital }}</p>
          </div>
        </UCard>
      </div>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">

// Initialize country store
const countryStore = useCountryStore();
const { loading, countries } = countryStore;

// State
const searchQuery = ref('');
const continentFilter = ref('');

// Options for the continent filter dropdown
const countriesOptions = [
  { name: 'Africa', value: 'Africa' },
  { name: 'Americas', value: 'Americas' },
  { name: 'Asia', value: 'Asia' },
  { name: 'Europe', value: 'Europe' },
  { name: 'Oceania', value: 'Oceania' },
  { name:'All', value: 'All' }
];

// Filter countries based on search query and continent filter
const filteredCountries = computed(() => {
  if (loading) {
    return [];
  }
  return countries.filter(country => {
    if (continentFilter.value === 'All') {
      return searchQuery.value ? country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase()) : true;
    }
    return (searchQuery.value ? country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase()) : true) &&
        (continentFilter.value ? country.region === continentFilter.value : true);
  });
});

// Redirect to country detail page
const redirection = (countryName: string) => {
  navigateTo(`/country/${countryName}`);
};
</script>
