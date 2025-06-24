import React, { useEffect, useState } from "react";
import type { Product } from "../types";
import {
  deleteProductById,
  getAllProducts,
} from "../../services/ProductService";
import { Navigate, useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (confirmed) {
      try {
        await deleteProductById(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        console.log(`Product "${name}" deleted.`);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    `${p.name} ${p.category}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container my-5">
        <h2
          style={{
            color: "#FFC107",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Loading products...
        </h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Heading */}
      <h2
        style={{
          color: "#FFC107",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        Products
      </h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-end mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
          style={{
            width: "300px",
            backgroundColor: "#ffffff",
            border: "2px solid #FFC107",
            color: "#000000",
            padding: "10px",
            fontWeight: "500",
            outline: "none",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 0 2px #FFC107")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table
          className="table"
          style={{
            backgroundColor: "#121212",
            color: "#ffffff",
            borderCollapse: "separate",
            borderSpacing: 0,
            border: "1px solid #FFC107",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#000000" }}>
              {[
                "ID",
                "User ID",
                "Name",
                "Price",
                "SKU",
                "Category",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    color: "#FFC107",
                    fontWeight: "bold",
                    padding: "12px",
                    borderBottom: "1px solid #FFC107",
                    textAlign: "center",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: "1px solid #444",
                    textAlign: "center",
                    transition: "background-color 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a1a1a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td>{p.id}</td>
                  <td>{p.user_id}</td>
                  <td>{p.name}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.sku}</td>
                  <td>{p.category}</td>
                  {/* Actions */}
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#17a2b8", color: "#fff" }}
                        onClick={() =>
                          navigate(`/products/${p.id}/details`, { state: p })
                        }
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#ffc107", color: "#000" }}
                        onClick={() =>
                          navigate(`/products/${p.id}/edit`, { state: p })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#dc3545", color: "#fff" }}
                        onClick={() => handleDelete(p.id, p.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    color: "#FFC107",
                    textAlign: "center",
                    padding: "1rem",
                  }}
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
