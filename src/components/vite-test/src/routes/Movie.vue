<template>
  <h1>{{ movie.Title }}</h1>
  <div
    :style="{ backgroundImage: `url(${requsetDiffSizePoster(movie.Poster)})` }"
    class="poster"></div>
</template>

<script>
export default {
  data() {
    return { 
      movie: {}
    }
  },
  created() {
    this.searchMovieDetails()
  },
  methods: {
    async searchMovieDetails() {
      console.log(this.$route)
      let res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&i=${this.$route.params.sun}`)
      res = await res.json()
      console.log(res)
      this.movie = res
    },
    requsetDiffSizePoster(src = '') {
      return src.replace('SX300', 'SX700')
    }
  }
}
</script>

<style scoped lang="scss">
.poster {
  width: 400px;
  height: calc(400px * 3 / 2);
  background-size: cover;
  background-color: lightgray;
}
</style>
