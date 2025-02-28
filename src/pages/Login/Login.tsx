import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../validate/AuthContext";
import RegisterPopup from "../../components/Registration/RegisterPopup";
import "./Login.css"; 
import loginSound from "../../assets/sound/login.mp3"; 

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ token: string }>("http://localhost:5000/auth/login", formData);
      login(res.data.token);

      

      navigate("/Home");

      const audio = new Audio(loginSound);
      audio.play();
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid Username or Password");
    }
  };

  return (
    <div className="login-background">
      <div className="login-overlay">
        <div className="login-container">
          <h2 className="login-title">Sign In</h2>

          {error && <p className="error-message">{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="login-input"
                onChange={handleChange}
                required
              />
              <span className="input-icon">👤</span>
            </div>

            
            <div className="input-container">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
                onChange={handleChange}
                required
              />
              <span className="input-icon">🔒</span> 
            </div>

            
            <div className="remember-forgot">
              <label>
                <input type="checkbox" id="remember" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-button">Submit</button>
          </form>

          <div className="signup">
            <p>New here? <span onClick={() => setShowRegister(true)}>Sign up now</span></p>
          </div>

          {showRegister && <RegisterPopup onClose={() => setShowRegister(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Login;