import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import AdminLayout from "./components/layouts/Admin";
import FarmerLayout from "./components/layouts/Farmer";
import BuyerLayout from "./components/layouts/Buyer";
import { useEffect, useState } from "react";
import WrongRouteModal from "./components/WrongRouteModal";

function App() {
  const [isCorrectRoute, setIsCorrectRoute] = useState(false);
  const [open, setOpen] = useState(false);
  const [wrongRoute, setWrongRoute] = useState(false);

  const [isFarmer, setIsFarmer] = useState(
    localStorage.getItem("userRole") == "Farmer"
  );
  const [isBuyer, setIsBuyer] = useState(
    localStorage.getItem("userRole") == "Buyer"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("userRole") == "Admin"
  );

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    var query = window.location.pathname;
    var vars = query.split("/");

    if (localStorage.getItem("userRole") == "Farmer" && vars[1] !== "farmer") {
      console.log("Farmer - incorrect route");
      setWrongRoute(true);
      handleOpen();
    } else if (
      localStorage.getItem("userRole") == "Buyer" &&
      vars[1] !== "buyer"
    ) {
      console.log("Buyer - incorrect route", vars);
      setWrongRoute(true);
      handleOpen();
    } else if (
      localStorage.getItem("userRole") == "Admin" &&
      vars[1] !== "admin"
    ) {
      console.log("Admin - incorrect route", vars);
      setWrongRoute(true);
      handleOpen();
    }
  }, []);

  return (
    <div>
      <Router>
        <div>
          {/*<Routes>*/}

          <WrongRouteModal open={open} handleClose={handleClose} />

          {!localStorage.getItem("userRole") && (
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          )}
          {localStorage.getItem("userRole") == "Farmer" && (
            <Routes>
              <Route path="/farmer/*" element={<FarmerLayout />} />
            </Routes>
          )}

          {localStorage.getItem("userRole") == "Buyer" && (
            <Routes>
              <Route path="/buyer/*" element={<BuyerLayout />} />
            </Routes>
          )}

          {localStorage.getItem("userRole") == "Admin" && (
            <Routes>
              <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
          )}

          {/*  <Route path="/" element={<Login />} />*/}
          {/*  <Route path="/admin/*" element={<AdminLayout />} />*/}

          {/*  <Route path="/buyer/*" element={<BuyerLayout />} />*/}
          {/*</Routes>*/}
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
