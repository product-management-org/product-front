import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/UserService";
import type { User } from "../types";

const UserEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getUserById(parseInt(id))
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!user) return;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    if (user) {
      await updateUser(user.id, user);
      navigate("/users");
    }
  };

  if (loading) {
    return <div className="text-center text-warning mt-5">Loading user...</div>;
  }

  if (!user) {
    return <div className="text-center text-danger mt-5">User not found.</div>;
  }

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{ color: "#FFC107", fontWeight: "bold" }}
      >
        Edit User
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
          { name: "username", label: "Username" },
          { name: "email", label: "Email" },
          { name: "phone", label: "Phone" },
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
        ].map(({ name, label }) => (
          <div className="mb-3" key={name}>
            <label className="form-label text-warning">{label}</label>
            <input
              className="form-control"
              type="text"
              name={name}
              value={(user as any)[name]}
              onChange={handleChange}
              style={{
                backgroundColor: "#2c2c2c",
                color: "#fff",
                border: "1px solid #444",
              }}
            />
          </div>
        ))}

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
            Save
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#6c757d",
              color: "#fff",
              fontWeight: "bold",
            }}
            type="button"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
