const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "https://skill-mirror-2.onrender.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export { API_BASE_URL };
