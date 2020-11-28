<template>
  <div class="movie-ticket">
    <movie-ticket-step class="movie-ticket-step" :progress="1" />
  </div>
</template>

<script>
import MovieTicketStep from "@/components/movie-ticket/MovieTicketStep.vue";

export default {
  components: { MovieTicketStep }
};
</script>

<style lang="scss"></style>
