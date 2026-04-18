const BASE_URL = "http://localhost:5000/api";

// GET ALL TEMPLES
export const getTemples = async (query = "") => {
  const res = await fetch(`${BASE_URL}/temples${query}`);
  const data = await res.json();
  return data;
};