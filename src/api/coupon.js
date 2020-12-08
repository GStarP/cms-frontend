import axios from "@/plugins/axios.js";

export async function getUserCoupon(userId) {
  const { data } = await axios.get(`/coupon/${userId}/get`);
  return data;
}