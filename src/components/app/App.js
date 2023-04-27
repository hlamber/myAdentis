import React from "react";
import "./app.css";
import { AuthProvider } from "../../hooks/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../signup/Signup";
import Dashboard from "../dashboard/Dashboard";
import Login from "../login/Login";
import PrivateRoute from "../privateroute/PrivateRoute";
import ForgotPassword from "../forgotpassword/ForgotPassword";
import UpdateProfile from "../updateprofile/UpdateProfile";
import CreateDocument from "../Formulaire/newDoc/CreateDocument";
import DetailsDocument from "../Formulaire/DetailsDoc/DetailsDocument";
import EditDocuments from "../Formulaire/UpdateDoc/EditDocuments";
import PDFRender from "../PDFRender/PDFRender";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="app">

      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      >
      </ToastContainer>

      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/newDoc" element={<CreateDocument />} />
            <Route path="/editDoc/:id" element={<EditDocuments />} />
            <Route path="/Document/:id" element={<DetailsDocument />} />
            <Route path="/test" element={<PDFRender />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
