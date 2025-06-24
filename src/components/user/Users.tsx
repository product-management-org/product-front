import React, { useEffect, useState } from "react";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import { deleteUserById, getAllUsers } from "../../services/userService";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserById(id);
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const filtered = users.filter((u) =>
    `${u.username} ${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
        Users
      </h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-end mb-4">
        <input
          type="text"
          placeholder="Search users..."
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
              {["ID", "Username", "Email", "Full Name", "Phone", "Action"].map(
                (header) => (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u) => (
                <tr
                  key={u.id}
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
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.firstName} {u.lastName}
                  </td>
                  <td>{u.phone}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#17a2b8", color: "#fff" }}
                        onClick={() => navigate(`/users/${u.id}/details`)}
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#ffc107", color: "#000" }}
                        onClick={() => navigate(`/users/${u.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#dc3545", color: "#fff" }}
                        onClick={() => handleDelete(u.id)}
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
                  colSpan={6}
                  style={{
                    color: "#FFC107",
                    textAlign: "center",
                    padding: "1rem",
                  }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
