import axios from "@/plugins/axios.js";

export async function login(username, password) {
  const { data } = await axios.post("/login", {
    username,
    password
  });
  return data;
}

export async function register(username, password) {
  const { data } = await axios.post("/register", {
    username,
    password
  });
  return data;
}
