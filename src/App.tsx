import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Products from "./components/product/Products";
import ProductDetails from "./components/product/ProductDetails";
import ProductEdit from "./components/product/ProductEdit";
import Users from "./components/user/users";
import UserEdit from "./components/user/UserEdit";
import UserDetails from "./components/user/UserDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id/details" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route path="/users/:id/details" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
