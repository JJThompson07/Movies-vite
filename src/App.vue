<template>
  <!-- This is where your template goes	-->
  <div data-test-id="movie-app" class="w-full border-box p-14 font-sans">
    <div class="movies">
      <div class="flex justify-end my-6"><button @click="openForm()" class="text-white bg-sky-400 px-2 py-1 rounded">Add movie</button></div>
      <div class="grid grid-cols-3 box-border gap-4">
        <movie-item v-for="(movie, movieIndex) of movies" :key="movie.id" :movie-index="movieIndex" :movie="movie" @update:rating="updateRating" @open:form="openForm" @remove:movie="removeMovie" />
      </div>
    </div>
    <transition name="fade">
      <div v-show="showForm" class="fixed top-0 left-0 h-full w-full p-8 flex justify-center items-center backdrop-brightness-50 backdrop-blur-lg">
        <movie-form @cancel="showForm = false" v-model="movieForm" @submit="updateMovies" />
      </div>
    </transition>
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
import MovieItem from "./components/MovieItem.vue";

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

const removeMovie = (index) => {
  movies.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
