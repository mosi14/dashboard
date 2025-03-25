import API from "./client";

export const fetchProducts = () => API.get("/products?limit=100");

export const fetchAllProducts = () => API.get("/products");
