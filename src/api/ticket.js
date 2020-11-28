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
