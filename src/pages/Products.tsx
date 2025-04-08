import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router";
import useDebounce from "../hooks/useDebounce";
import useFetchProducts from "../hooks/useFetchProducts";
import useFetchCategories from "../hooks/useFetchCategories";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("q") || "";
  const initialCategory = params.get("category") || "all";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //get category
  const {
    categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useFetchCategories();


  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) {
      params.set("q", debouncedSearchTerm);
    }
    if (categoryFilter !== "all") {
      params.set("category", categoryFilter);
    }
    navigate({ search: params.toString() });
    // Reset to first page when search or filter changes.
    setPage(1);
  }, [debouncedSearchTerm, categoryFilter, navigate]);

  const { products, total, loading, error } = useFetchProducts(
    page,
    debouncedSearchTerm,
    categoryFilter
  );

  const totalPages = Math.ceil(total / 8);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
        />
        {loadingCategories ? (
          <div>Loading categories...</div>
        ) : categoriesError ? (
          <div className="text-red-500">{categoriesError}</div>
        ) : (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded-lg w-full md:w-1/4 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, index) => (
              <option key={`category-${index}`} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <div className="text-center text-xl animate-pulse">
          Loading products...
        </div>
      ) : error ? (
        <div className="text-center text-xl text-red-500">{error}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto w-full"
        >
          <div className="overflow-x-auto w-full">
            <table className="w-full table-none table-fix border rounded-lg overflow-hidden shadow-md dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                  <th className="p-3 text-left border dark:border-gray-700">
                    ID
                  </th>
                  <th className="p-3 text-left border dark:border-gray-700">
                    Title
                  </th>
                  <th className="p-3 text-left border dark:border-gray-700">
                    Price
                  </th>
                  <th className="p-3 text-left border dark:border-gray-700">
                    Category
                  </th>
                  <th className="p-3 text-left border dark:border-gray-700">
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border dark:border-gray-700 ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.tags.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 space-x-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-1 border rounded-lg transition ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Prev
            </button>
            <span className="text-lg font-medium">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-1 border rounded-lg transition ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductsPage;
