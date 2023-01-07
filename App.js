import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Bill from "./pages/Bill/Bill";
import React from "react";
import Abate from "./pages/abate/Abate";
import Profile from "./pages/profile/Profile";
import Changepw from "./pages/changepw/Changepw";
import Invoice from "./pages/Invoice/Invoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bill" element={<Bill></Bill>} />
        <Route path="/abate" element={<Abate></Abate>} />
        <Route path="/profile" element={<Profile></Profile>} />
        <Route path="/changepassword" element={<Changepw></Changepw>} />
        <Route path="/invoice" element={<Invoice></Invoice>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
