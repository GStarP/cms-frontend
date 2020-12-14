import axios from "@/plugins/axios.js";

export async function getActivityByMovie(movieId) {
  const { data } = await axios.get(`/activity/getByMovieId?movieId=${movieId}`);
  return data;
}
