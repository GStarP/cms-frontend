import axios from "@/plugins/axios.js";

export async function getScheduleInfo(scheduleId) {
  const { data } = await axios.get(
    `/ticket/get/occupiedSeats?scheduleId=${scheduleId}`
  );
  return data;
}
