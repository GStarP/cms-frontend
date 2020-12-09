import axios from "@/plugins/axios.js";

export async function getCardTypes() {
  const { data } = await axios.get(`/card/get`);
  return data;
}

export async function getVIPCard(userId) {
  const { data } = await axios.get(`/vip/get/${userId}`);
  return data;
}

export async function buyVIPCard(userId, cardTypeId) {
  const { data } = await axios.post(`/vip/add/${userId}/${cardTypeId}`);
  return data;
}

export async function chargeVIPCard(vipId, amount) {
  const { data } = await axios.post(`/vip/charge`, {
    vipId,
    amount
  });
  return data;
}

export async function changeVIPCard(cardId, carfTypeId) {
  const { data } = await axios.post(`/vip/change/${cardId}/${carfTypeId}`);
  return data;
}
