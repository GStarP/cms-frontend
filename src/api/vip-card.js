import axios from "@/plugins/axios.js";

export async function getVIPCardByUserId(userId) {
  const { data } = await axios.get(`/vip/get/${userId}`);
  return data;
}
