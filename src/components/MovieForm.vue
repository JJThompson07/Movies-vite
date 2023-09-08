<template>
  <div data-test-id="movie-form" class="movie-form w-full flex flex-col p-4 gap-2 text-white bg-gray-700 rounded-lg border-solid border-4 border-gray-400">
    <div class="movie-form--item flex flex-col gap-1">
      <label for="name">Name</label>
      <input id="name" v-model="value.name" type="text" class="movie-form--input bg-gray-900 outline outline-gray-400 focus:outline-blue-500 py-1 px-3 rounded" required>
    </div>
    <div class="movie-form--item flex flex-col gap-1">
      <label for="description">Description</label>
      <textarea id="description" v-model="value.description" type="text" class="movie-form--input bg-gray-900 outline outline-gray-400 focus:outline-blue-500 py-1 px-3 rounded"></textarea>
    </div>
    <div class="movie-form--item flex flex-col gap-1">
      <label for="image">Image</label>
      <input id="image" v-model="value.image" type="text" class="movie-form--input bg-gray-900 outline outline-gray-400 focus:outline-blue-500 py-1 px-3 rounded">
    </div>
    <div class="movie-form--item flex flex-col gap-1">
      <label for="genres">Genres</label>
      <select id="genres" v-model="value.genres" name="genres" class="movie-form--input bg-gray-900 outline outline-gray-400 focus:outline-blue-500 py-1 px-3 rounded" multiple>
        <option v-for="(genre, i) of movieGenres" :key="i" :value="genre">{{ genre }}</option>
      </select>
    </div>
    <div class="movie-form--item flex flex-col items-start gap-1">
      <label for="inTheaters">In theaters</label>
      <input id="inTheaters" v-model="value.inTheaters" type="checkbox" class="movie-form--input bg-gray-900 outline outline-gray-400 focus:outline-blue-500 py-1 px-3 rounded">
    </div>
    <div class="movie-form--item flex flex-col items-start gap-1">
      <label for="inTheaters">Rating</label>
      <div class="rating--stars flex gap-0.5">
        <div v-for="rate in 5" :key="rate"><StarIcon class="w-4 h-4" @click="value.rating = rate" :class="value.rating >= rate ? 'text-yellow-500' : 'text-gray-400'"/></div>
      </div>
    </div>
    <div class="flex mt-4 justify-between">
      <div class="flex gap-2">
        <button id="cancel-form" @click="cancel" class="bg-gray-400 hover:bg-gray-600 form-button">Cancel</button>
        <button id="reset-form" @click="resetForm" class="bg-orange-400 hover:bg-orange-600 form-button">Reset</button>
      </div>
      <button id="submit-form" @click="submit" class="bg-sky-400 hover:bg-sky-600 form-button">Submit</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { StarIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(['submit', 'cancel']);
const props = defineProps(['modelValue']);

const initialValue = ref({
  name: '',
  description: '',
  image: '',
  genres: [],
  inTheaters: false,
  rating: ''
});

const movieGenres = ref([
  'Crime',
  'Action',
  'Drama',
  'Horror',
  'Sci-fy',
  'Thriller',
  'Rom-com',
  'Comedy',
]);

const value = ref({ ...(props.modelValue || initialValue.value) });

const resetForm = () => {
  value.value = { ...(props.modelValue || initialValue.value) };
}

const cancel = () => {
  resetForm();
  emit('cancel');
}

const submit = () => {
  emit('submit', value.value);
}
</script>

<style lang="scss" scoped>
.form {
  &-button {
    @apply px-1 py-1 rounded transition-all
  }
}
</style>