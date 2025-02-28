import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./RegisterPopup.css"; // NEW: Separate CSS file

const RegisterPopup = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <motion.div
      className="register-popup-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="register-popup-container"
        initial={{ y: "-100vh" }}
        animate={{ y: "0" }}
        exit={{ y: "-100vh" }} // NEW: Exit transition in same direction
        transition={{ type: "spring", stiffness: 100 }}
      >
        
        {/* Title */}
        <h2 className="register-title">Create an Account</h2>

        {/* Success Message */}
        {success && <p className="success-message">🎉 Registration Successful!</p>}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="register-form">
        <div className="input-container-1">
          {/* Username Input */}
          <input
            type="text"
            name="Name of the organization"
            placeholder="Name of the organization"
            onChange={handleChange}
            required
            className="register-input"
          />
          <span className="input-icon-1">🏢</span>
          </div>

          <div className="input-container-1">
          {/* Username Input */}
          <input
            type="text"
            name="Contact Number"
            placeholder="Contact  Number"
            onChange={handleChange}
            required
            className="register-input"
          />
          <span className="input-icon-1">☎️</span>
          </div>

          <div className="input-container-1">
          {/* Username Input */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="register-input"
          />
          <span className="input-icon-1">👤</span>
          </div>

          <div className="input-container-1">
          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="register-input"
            
          />
          <span className="input-icon-1">🔒</span>
          </div>

          {/* Submit Button */}
          <motion.button type="submit" className="register-button">
            Submit
          </motion.button>
          <p className="register-text">Submitting the form will accept the  <span className="highlight">Terms & Conditions </span>and <span className="highlight">Privacy Policy</span></p>
          <hr/>
          <p className="register-text">Already have credentials? <span className="highlight">Curator's Login</span></p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPopup;
