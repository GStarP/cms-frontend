import axios from "@/plugins/axios.js";

export async function getConsumeHistory(userId) {
  const { data } = await axios.get(`/history/consume/get?userId=${userId}`);
  return data;
}

export async function getConsumeDetail(consumeId) {
  const { data } = await axios.get(
    `/history/consume/get/detail?id=${consumeId}`
  );
  return data;
}

export async function getTopupHistory(userId) {
  const { data } = await axios.get(`/history/topup/get?userId=${userId}`);
  return data;
}
