import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import PaymentVerify from "./pages/PaymentVerify";
import PaymentHistory from "./pages/PaymentHistory";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/payment/verify" element={<PaymentVerify />} />
          <Route path="/payment/history" element={<PaymentHistory />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </>
  );
}
