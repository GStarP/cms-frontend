import axios from "@/plugins/axios.js";

export async function getMovieDetailByUser(userId, movieId) {
  const { data } = await axios.get(`/movie/${movieId}/${userId}`)
  return data
}

export async function toggleLikeMovie(userId, movieId, islike) {
  if (islike === 1) {
    const { data } = await axios.post(`/movie/${movieId}/unlike?userId=${userId}`)
    return data
  } else {
    const { data } = await axios.post(`/movie/${movieId}/like?userId=${userId}`)
    return data
  }
}
