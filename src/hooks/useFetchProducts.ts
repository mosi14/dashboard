import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { fetchProducts } from "../api/product";

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchProducts();
      setProducts(res.data.products);
      const uniqueCategories: string[] = Array.from(
        new Set(res.data.products.map((p: Product) => p.category))
      );
      setCategories(uniqueCategories);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { products, categories, loading };
};

export default useFetchProducts;