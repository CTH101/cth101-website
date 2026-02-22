import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import LogGuard from "./pages/LogGuard"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Register from "./pages/Register"


import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {

return (


<BrowserRouter>

  <Routes>

    {/* Login Page (No Navbar/Footer) */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />


    {/* Protected Application Layout */}
    <Route
      path="/*"
      element={

        <div className="bg-black min-h-screen">

          <Navbar />

          <Routes>

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/logguard"
              element={
                <ProtectedRoute>
                  <LogGuard />
                </ProtectedRoute>
              }
            />

          </Routes>

          <Footer />

        </div>

      }
    />

  </Routes>

</BrowserRouter>


)
}
