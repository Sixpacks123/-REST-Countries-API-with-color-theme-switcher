import { defineStore } from 'pinia';
import { ref } from 'vue';

interface NativeName {
    official: string;
    common: string;
}

interface Name {
    common: string;
    official: string;
    nativeName: Record<string, NativeName>;
}
// Define the structure for a country as received from the API
interface Country {
    name: Name;
    cca3: string;
    flags: { svg: string };
    population: number;
    region: string;
    capital: string;
    subregion: string;
    nativeName: string;
    tld: string[];
    currencies: { [key: string]: { name: string, symbol: string } };
    languages: { [key: string]: string };
    borders: string[];
}

export const useCountryStore = defineStore('country', () => {
    const countries = ref<Country[]>([]);
    const selectedCountry = ref<Country | null>(null);
    const loading = ref(false);

    // Fetch all countries
    const fetchCountries = async () => {
        loading.value = true;
        try {
            const { data } = await useFetch<Country[]>('https://restcountries.com/v3.1/all');
            if (data.value) {
                countries.value = data.value.map(country => ({
                    ...country,
                    capital: country.capital ? country.capital.join(', ') : 'No Capital'
                }));
            } else {
                countries.value = [];
            }
        } catch (error) {
            console.error('Failed to fetch countries:', error);
            countries.value = [];
        } finally {
            loading.value = false;
        }
    };


// Fetch country by name
    const fetchCountryByName = async (countryName: string) => {
        loading.value = true;
        try {
            const { data } = await useFetch<Country[]>('https://restcountries.com/v3.1/name/' + countryName);
            if (data.value && data.value.length > 0) {
                console.log(data.value);
                const rawCountry = data.value[0];
                // Convertir le tableau de capitales en chaîne de caractères
                rawCountry.capital = rawCountry.capital ? rawCountry.capital.join(', ') : 'No Capital';
                selectedCountry.value = rawCountry;
            } else {
                selectedCountry.value = null;
            }
        } catch (error) {
            console.error('Failed to fetch country by name:', error);
            selectedCountry.value = null;
        } finally {
            loading.value = false;
        }
    };

    const resetSelectedCountry = () => {
        selectedCountry.value = null;  // Réinitialiser le pays sélectionné
    };

    // Fetch country by alpha code
    const fetchCountryByAlpha = async (alphaCode: string) => {
        loading.value = true;
        try {
            const { data } = await useFetch<Country[]>(`https://restcountries.com/v3.1/alpha/${alphaCode}`, { immediate: true });
            loading.value = false;
            if (data.value && data.value.length > 0) {
                const country = data.value[0]; // Extraction du premier élément du tableau
                return country;
            } else {
                console.error('No country found for this code:', alphaCode);
                return null;
            }
        } catch (error) {
            console.error(`Failed to fetch country by alpha code: ${alphaCode}`, error);
            return null;
        } finally {
            loading.value = false;
        }
    };



    return {
        countries,
        loading,
        selectedCountry,
        fetchCountries,
        fetchCountryByName,
        resetSelectedCountry,
        fetchCountryByAlpha
    };
});
