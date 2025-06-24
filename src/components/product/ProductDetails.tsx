import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/ProductService";
import type { Product } from "../types";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h4 style={{ color: "#FFC107" }}>Loading product...</h4>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h4 className="text-danger">Product not found.</h4>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2
        style={{
          color: "#FFC107",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Product Details
      </h2>

      <div
        className="p-4"
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          border: "1px solid #FFC107",
          color: "#fff",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        {[
          { label: "ID", value: product.id },
          { label: "User ID", value: product.user_id },
          { label: "Name", value: product.name },
          { label: "Description", value: product.description },
          { label: "Price", value: `$${product.price.toFixed(2)}` },
          { label: "SKU", value: product.sku },
          { label: "Category", value: product.category },
          {
            label: "Created At",
            value: new Date(product.createdAt).toLocaleString(),
          },
          {
            label: "Updated At",
            value: new Date(product.updatedAt).toLocaleString(),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="mb-3"
            style={{
              padding: "10px",
              backgroundColor: "#2c2c2c",
              borderRadius: "8px",
              border: "1px solid #333",
            }}
          >
            <strong style={{ color: "#FFC107" }}>{item.label}:</strong>
            <span style={{ marginLeft: "10px", fontWeight: "500" }}>
              {item.value}
            </span>
          </div>
        ))}

        <div className="text-center mt-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#FFC107",
              color: "#000",
              fontWeight: "bold",
              padding: "8px 24px",
              borderRadius: "6px",
            }}
            onClick={() => navigate("/")}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
