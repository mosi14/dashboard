import { useState, useEffect } from "react";
import {  ProductsResponse } from "../types/product";
//import { fetchProducts } from "../api/product";

const ITEMS_PER_PAGE = 8;

const useFetchProducts = (
  page: number,
  searchTerm: string,
  categoryFilter: string
) => {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const skip = (page - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    setLoading(true);
    setError("");
    let url = "";

    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
        searchTerm
      )}&limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    }

    else if (categoryFilter !== "all") {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(
        categoryFilter
      )}?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    }

    else {
      url = `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [page, searchTerm, categoryFilter, skip]);

  return {
    products: data?.products || [],
    total: data?.total || 0,
    loading,
    error,
  };
};

export default useFetchProducts;
