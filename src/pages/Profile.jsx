import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { MdEdit, MdSave, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password || "");
      setProfileImage(user.profileImage);
    }
  }, [user]);

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
    const updates = { name, email, password, profileImage };
    const res = updateProfile(updates);
    if (res.success) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } else {
      setMessage({ type: "error", text: "Failed to update profile." });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <button
            className="icon-btn"
            onClick={() => navigate(-1)}
            title="Back"
          >
            <MdArrowBack size={24} />
          </button>
          <h2>My Profile</h2>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="image-upload-section">
            <div
              className="profile-preview-large"
              style={{
                backgroundImage: profileImage ? `url(${profileImage})` : "none",
              }}
            >
              {!profileImage && <span>No Photo</span>}
            </div>
            <label className="upload-btn">
              <MdEdit size={16} />
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
              />
            </label>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="profile-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="profile-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="profile-input"
              placeholder="Update password"
            />
          </div>

          <button type="submit" className="save-btn">
            <MdSave size={20} />
            Save Changes
          </button>
        </form>
      </div>

      <style>{`
        .profile-container {
            display: flex;
            justify-content: center;
            padding: 40px 20px;
        }
        .profile-card {
            background: #202124;
            padding: 32px;
            border-radius: 8px;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0.6), 0 2px 6px 2px rgba(0,0,0,0.3);
            border: 1px solid var(--border-color);
            width: 100%;
            max-width: 500px;
        }
        .profile-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
        }
        .profile-header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 500;
            color: var(--text-primary);
        }
        .image-upload-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 32px;
            gap: 16px;
        }
        .profile-preview-large {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: #202124;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            background-position: center;
            border: 2px solid var(--border-color);
            color: var(--text-secondary);
        }
        .upload-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.2s;
            color: var(--text-primary);
        }
        .upload-btn:hover {
            background-color: var(--btn-hover);
        }
        .hidden-input {
            display: none;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 8px;
            font-weight: 500;
        }
        .profile-input {
            width: 100%;
            padding: 10px 12px;
            font-size: 16px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            background: transparent;
        }
        .profile-input:focus {
            outline: none;
            border-color: #8ab4f8;
            box-shadow: 0 0 0 1px #8ab4f8;
        }
        .save-btn {
            width: 100%;
            background-color: #8ab4f8;
            color: #202124;
            border: none;
            padding: 12px;
            border-radius: 4px;
            font-weight: 500;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background 0.2s;
        }
        .save-btn:hover {
            background-color: #aecbfa;
        }
        .message {
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        }
        .message.success {
            background-color: #0f5132;
            color: #d1e7dd;
            border: 1px solid #0f5132;
        }
        .message.error {
            background-color: #842029;
            color: #f8d7da;
            border: 1px solid #842029;
        }
      `}</style>
    </div>
  );
};

export default Profile;
