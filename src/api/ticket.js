import axios from "@/plugins/axios.js";

export async function getAllTicket(userId) {
  const { data } = await axios.get(
    `/ticket/get/${userId}`
  );
  return data;
}

export async function issueTicket(ticketId) {
  const { data } = await axios.get(
    `/ticket/issue?ticketId=${ticketId}`
  );
  return data;
}

export async function deleteTicket(ticketId) {
  const { data } = await axios.get(
    `/ticket/delete?ticketId=${ticketId}`
  );
  return data;
}

export async function cancelTicket(ticketId) {
  const { data } = await axios.get(
    `/ticket/cancel?ticketId=${ticketId}`
  );
  return data;
}

export async function getTicketRefund(ticketId) {
  const { data } = await axios.get(
    `/ticket/getTicketRefund?ticketId=${ticketId}`
  );
  return data;
}