<template>
  <div  class="rounded-lg flex-1 flex flex-col overflow-hidden relative movie" :data-test-id="`movie-${movie.id}`">
    <div class="movie--image w-full bg-center bg-no-repeat bg-cover relative" :style="`background-image: url(${movie.image})`">
      <div class="movie--actions flex flex-row gap-2 w-full justify-end absolute bottom-0 p-2">
      <div class="movie--action bg-green-400 hover:bg-green-600 text-white" @click="openForm(movie)">Edit</div>
      <div class="movie--action bg-red-400 hover:bg-red-600 text-white" @click="removeMovie(movieIndex)">Remove</div>
    </div>
    </div>
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
</template>

<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  movieIndex: Number,
  movie: Object
});

const emit = defineEmits(['open:form', 'update:rating', 'remove:movie']);

const openForm = (form) => {
  emit('open:form', form)
}


const updateRating = (movieIndex, rate) => {
  emit('update:rating', movieIndex, rate)
}

const removeMovie = (index) => {
  emit('remove:movie', index)
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

  &--action {
    @apply px-1 py-1 rounded transition-all
  }
}

</style>