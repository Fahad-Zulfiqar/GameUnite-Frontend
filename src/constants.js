export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

// export const DATA_JSON_URL = "./products.js";

export const PRODUCTS_URL = "/api/products";

export const USERS_URL = "/api/users";
export const BLOGS_URL = "/api/blogs";
export const ORDERS_URL = "/api/orders";
export const Stripe_URL = "/api/config/stripe";
export const UPLOAD_URL = "/api/upload";
