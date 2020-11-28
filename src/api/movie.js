import axios from "@/plugins/axios.js";

export async function getMovieDetail(movieId) {
  const { data } = await axios.get(`/movie/${movieId}/1`);
  return data;
}

export async function searchMoviesByKeyword(keyword) {
  const { data } = await axios.get("/movie/search?keyword=" + keyword);
  return data;
}

export async function getBannerInfo() {
  const { data } = await axios.get("/banner/get");
  return data;
}

export async function getComingMovieList() {
  const { data } = await axios.get("/movie/coming/top");
  return data;
}

export async function getPopularMovieList() {
  const { data } = await axios.get("/statistics/movieLike/top");
  return data;
}

export async function getRankingMovieList() {
  const { data } = await axios.get("/statistics/boxOffice/top10");
  return data;
}
