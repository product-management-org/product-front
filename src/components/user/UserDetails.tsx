import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/UserService";
import type { User } from "../types";

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) getUserById(parseInt(id)).then(setUser);
  }, [id]);

  if (!user) {
    return (
      <div className="container my-5 text-center">
        <h4 style={{ color: "#FFC107" }}>Loading user details...</h4>
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
        User Details
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
          { label: "Username", value: user.username },
          { label: "Email", value: user.email },
          { label: "Phone", value: user.phone || "N/A" },
          { label: "Full Name", value: `${user.firstName} ${user.lastName}` },
          { label: "Created At", value: user.createdAt },
          { label: "Updated At", value: user.updatedAt },
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
            onClick={() => navigate("/users")}
          >
            Back to Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
