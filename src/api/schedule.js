import axios from "@/plugins/axios.js";

export async function getMovieSchedule(movieId) {
  const { data } = await axios.get(
    `/schedule/search/audience?movieId=${movieId}`
  );
  return data;
}
