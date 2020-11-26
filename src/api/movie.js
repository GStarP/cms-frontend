import axios from "@/plugins/axios.js";

export async function searchMoviesByKeyword(keyword) {
  const { data } = await axios.get("/movie/search?keyword=" + keyword);
  return data;
}
