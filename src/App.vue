<template>
  <!-- This is where your template goes	-->
  <div class="w-full border-box p-14 font-sans">
  <div class="movies" :class="{'blur-sm': showForm}">
    <div class="flex justify-end my-6"><button @click="openForm()" class="text-white bg-sky-400 px-2 py-1 rounded">Add movie</button></div>
    <div class="grid grid-cols-3 box-border gap-4">
      <div v-for="(movie, movieIndex) of movies" :key="movie.id" class="rounded-lg flex-1 flex flex-col overflow-hidden relative">
        <div class="movie--image w-full bg-center bg-no-repeat bg-cover" :style="`background-image: url(${movie.image})`" @click="openForm(movie)" />
        <div class="movie--content bg-white flex flex-col gap-1 p-4 text-xs flex-grow">
          <h3 class="font-bold text-base">
            {{  movie.name }}
          </h3>
          <div class="movie--genres flex flex-wrap gap-1">
            <div v-for="(genre, index) of movie.genres" :key="index" class="bg-indigo-500 text-white rounded-xl w-max px-1.5 py-1 leading-none flex justify-center items-center">{{genre}}</div>
          </div>
          <p class="movies--desc text-xs min-h-max mb-5 flex-grow">{{ movie.description }}</p>
          <div class="movies--rating flex justify-start items-center gap-1 justify-self-end">
            <p class="rating--raw">Rating: ({{ movie.rating }}/5)</p>
            <div class="rating--stars flex gap-0.5">
              <div v-for="rate in 5" :key="rate"><StarIcon class="w-4 h-4" @click="updateRating(movieIndex, rate)" :class="movie.rating >= rate ? 'text-yellow-500' : 'text-gray-400'"/></div>
            </div>
  
          </div>
        </div>
        <div class="movie--float-rating absolute top-1 right-1">
          <div class="relative">
            <StarIcon class="w-10 h-10" :class="movie.rating ? 'text-yellow-500' : 'text-gray-400'"/>
            <span class="movie--float-rating absolute top-0 left-0 w-full h-full flex justify-center items-center text-xs font-semibold" :class="{'text-amber-700': movie.rating }">{{ movie.rating || '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div v-if="showForm" class="fixed top-0 left-0 h-full w-full p-8 flex justify-center items-center">
      <movie-form @cancel="showForm = false" v-model="movieForm" @submit="updateMovies" />
    </div>
    </div>

</template>

<script setup>
import { items } from "./movies.json";
/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
import { StarIcon } from "@heroicons/vue/24/solid";
import { ref } from 'vue';
import MovieForm from './components/MovieForm.vue';

const movies = ref(items);
const movieForm = ref(null);
const showForm = ref(false);

const updateRating = (index, rating) => {
  if (movies.value[index].rating === rating) {
    movies.value[index].rating = 0;
  } else {
    movies.value[index].rating = rating;
  }
}

const updateMovies = (form) => {
  if (!form.id) {
    form.id = movies.value.length + 1;
    movies.value.push(form);
  } else {
    const index = movies.value.findIndex(movie => movie.id === form.id);
    movies.value[index] = { ...form  }
  }

  showForm.value = false;
  moveForm.value = null;
}

const openForm = (form) => {
  movieForm.value = form;

  showForm.value = true;
}
</script>

<style lang="scss" scoped>
.movie {
  &--genres {
    font-size: 8px;
  }
  &--image {
    aspect-ratio: 2 / 3;
  }
}
</style>
