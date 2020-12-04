import axios from "@/plugins/axios.js";

export async function getScheduleInfo(scheduleId) {
  const { data } = await axios.get(
    `/ticket/get/occupiedSeats?scheduleId=${scheduleId}`
  );
  return data;
}

export async function lockSeat(userId, scheduleId, seats) {
  const { data } = await axios.post("/ticket/lockSeat", {
    userId,
    scheduleId,
    seats
  });
  return data;
}

export async function getTicketToPay(userId) {
  const { data } = await axios.get(`/ticket/toPay?userId=${userId}`);
  return data;
}

export async function buyTicketByVIP(ticketIdList, couponId) {
  const { data } = await axios.post("/ticket/vip/buy", {
    ticketId: ticketIdList,
    couponId
  });
  return data;
}

export async function buyTicket(ticketIdList, couponId) {
  const { data } = await axios.post("/ticket/buy", {
    ticketId: ticketIdList,
    couponId
  });
  return data;
}
