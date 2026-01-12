import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register(name, email, password, profileImage);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="profile-upload">
            <div
              className="profile-preview"
              style={{
                backgroundImage: profileImage ? `url(${profileImage})` : "none",
              }}
            >
              {!profileImage && <span>Using a photo?</span>}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>

          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <style>{`
          .profile-upload {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
            gap: 10px;
          }
          .profile-preview {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #202124;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            background-position: center;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            font-size: 10px;
            overflow: hidden;
          }
          .file-input {
            width: 100%;
            max-width: 200px;
            font-size: 12px;
            color: var(--text-primary);
          }
        `}</style>

        <div className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
