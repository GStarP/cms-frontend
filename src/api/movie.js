import axios from "@/plugins/axios.js";

export async function getMovieDetailByUser(userId, movieId) {
  const { data } = await axios.get(`/movie/${movieId}/${userId}`)
  return data
}
