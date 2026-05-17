const isProduction = import.meta.env.PROD;
const rawApiUrl = import.meta.env.VITE_API_URL;

if (isProduction && !rawApiUrl) {
  console.warn(
    "⚠️ Warning: VITE_API_URL is not set in production! Falling back to http://localhost:5000. " +
    "Please configure VITE_API_URL in your Render static site dashboard environment variables."
  );
}

const API_BASE_URL = rawApiUrl?.replace(/\/$/, "") || "http://127.0.0.1:5000";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export { API_BASE_URL };
