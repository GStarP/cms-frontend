<template>
  <div class="movie-list">
    <div class="movie-list-filter" v-if="movieList.length > 0">
      <search-filter
        :filter="filter"
        :countries="countrySet"
        :categories="categorySet"
      >
      </search-filter>
    </div>
    <div class="movie-list-content">
      <search-movie-list
        :movie-list="movieList"
        :selected-countries="countries"
        :selected-categories="categories"
      ></search-movie-list>
    </div>
  </div>
</template>

<script>
import { getAllMoviesExcludeOff, searchMoviesByKeyword } from "@/api/movie";
import SearchMovieList from "@/components/movie-list/SearchMovieList";
import SearchFilter from "@/components/movie-list/SearchFilter";

export default {
  data() {
    return {
      countries: [],
      categories: []
    };
  },
  components: {
    SearchMovieList,
    SearchFilter
  },
  computed: {
    movieList() {
      return this.$store.state.movieList;
    },
    countrySet() {
      const movieList = this.$store.state.movieList;
      return new Set(
        movieList
          .filter(m => m.country !== undefined)
          .flatMap(m => m.country.split("/"))
      );
    },
    categorySet() {
      const movieList = this.$store.state.movieList;
      return new Set(
        movieList
          .filter(m => m.type !== undefined)
          .flatMap(m => m.type.split("/"))
      );
    }
  },
  methods: {
    filter(countries, categories) {
      this.countries = [...countries];
      this.categories = [...categories];
    },
    handleSearchMovies(keyword) {
      const loading = this.$loading.service();
      searchMoviesByKeyword(keyword)
        .then(res => {
          this.$store.commit("setMovieList", res.content);
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    handleAllMovies() {
      const loading = this.$loading.service();
      getAllMoviesExcludeOff()
        .then(res => {
          this.$store.commit("setMovieList", res.content);
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    loadMovieList() {
      const route = this.$router.currentRoute;
      if (route.path === "/search") {
        this.handleSearchMovies(route.query.keyword);
      } else {
        this.handleAllMovies();
      }
    }
  },
  mounted() {
    this.loadMovieList();
  },
  watch: {
    $route(to, from) {
      this.loadMovieList();
    }
  }
};
</script>

<style lang="scss">
.movie-list {
  padding-top: 16px;
}
.movie-list-content {
  margin-top: 24px;
}
</style>
