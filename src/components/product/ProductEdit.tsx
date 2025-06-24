import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types";
import {
  getProductById,
  updateProductById,
} from "../../services/ProductService";

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(Number(id));
        setFormData(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData) return;
    try {
      await updateProductById(formData.id, formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-warning mt-5">Loading product...</div>
    );
  }

  if (!formData) {
    return (
      <div className="text-center text-danger mt-5">Product not found.</div>
    );
  }

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{ color: "#FFC107", fontWeight: "bold" }}
      >
        Edit Product
      </h2>

      <div
        className="p-4"
        style={{
          backgroundColor: "#1e1e1e",
          border: "1px solid #FFC107",
          borderRadius: "10px",
          maxWidth: "700px",
          margin: "auto",
          color: "#fff",
        }}
      >
        {[
          { name: "name", label: "Name" },
          { name: "description", label: "Description" },
          { name: "sku", label: "SKU" },
          { name: "category", label: "Category" },
        ].map(({ name, label }) => (
          <div className="mb-3" key={name}>
            <label className="form-label text-warning">{label}</label>
            <input
              className="form-control"
              type="text"
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              style={{
                backgroundColor: "#2c2c2c",
                color: "#fff",
                border: "1px solid #444",
              }}
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label text-warning">Price</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{
              backgroundColor: "#2c2c2c",
              color: "#fff",
              border: "1px solid #444",
            }}
          />
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              fontWeight: "bold",
            }}
            type="button"
            onClick={handleSubmit}
          >
            Confirm
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#6c757d",
              color: "#fff",
              fontWeight: "bold",
            }}
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
