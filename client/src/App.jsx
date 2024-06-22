import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import SignUp from "./pages/SignUp";
import SignIn from "./SignIn";
// import SignIn from "./pages/SignIn";


export default function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
      </Routes>
    </Router>
    </div>
  )
}